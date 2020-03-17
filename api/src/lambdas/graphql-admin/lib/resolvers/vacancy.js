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
	async vacancies({ limit }) {
		const vacancies =  await db('vacancy').join('fireStation', 'vacancy.fireStation', 'fireStation.id')
		vacancies.forEach(vacancy => mapFireStationToResource(vacancy))
		if(limit){
			vacancies.splice(limit)
		}
		return vacancies
	}
}
