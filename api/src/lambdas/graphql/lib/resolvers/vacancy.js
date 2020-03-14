const db = require('../config/db')

const formatVacancy = async vacancy => {
	const station = {
		id: vacancy.station,
		name: vacancy.name
	}
	vacancy.station = station
	return vacancy
}

module.exports = {
	async vacancy({ id }) {
		const vacancyFound = await db('vacancy')
			.join('fireStation', 'vacancy.station', 'fireStation.id')
			.where('vacancy.id', id)
			.first()
		const [ district, formattedVacancy ] = await Promise.all([
			db('district').where({ id: vacancyFound.district }).first(),
			formatVacancy(vacancyFound)
		])
		formattedVacancy.station.district = district
		return formattedVacancy
	}
}
