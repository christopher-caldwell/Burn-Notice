const db = require('../config/db')
const { mapVacancyToResource } =require('../utils/mapEntityToResource')

module.exports = {
	async vacancy({ id }) {
		const vacancyFound = await db('vacancy')
			.join('fireStation', 'vacancy.station', 'fireStation.id')
			.where('vacancy.id', id)
			.first()
		const district = await db('district').where({ id: vacancyFound.district }).first()
		mapVacancyToResource(vacancyFound)
		vacancyFound.station.district = district
		return vacancyFound
	},
	vacancies() {
		return db('vacancy')
	}
}
