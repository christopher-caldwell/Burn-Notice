const db = require('../config/db')
const { mapFireStationToResource } =require('../utils/mapEntityToResource')

module.exports = {
	async vacancy({ id }) {
		const vacancyFound = await db('vacancy')
			.join('fireStation', 'vacancy.fireStation', 'fireStation.id')
			.where('vacancy.id', id)
			.first()
		console.log('found station', vacancyFound)
		const district = await db('district').where({ id: vacancyFound.district }).first()
		mapFireStationToResource(vacancyFound)
		vacancyFound.fireStation.district = district
		return vacancyFound
	},
	vacancies() {
		return db('vacancy')
	}
}
