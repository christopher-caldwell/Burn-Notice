const db = require('../config/db')
const mapAccountToResource = require('../utils/mapAccountToResource')

const findDistrict = districtId => {
	return db('district')
			.join('account', 'district.chief', 'account.id')
			.where('district.id', districtId)
			.first()
}

const findVacanciesForStation = stationId => {
	return db('vacancy').where({ station: stationId })
}

module.exports = {
	async fireStation({ id }) {
		const [ station ] = await db('fireStation')
			.leftJoin('account', 'fireStation.captain', 'account.id')
			.where('fireStation.id', id)
		
		const [ district, vacancies ] = await Promise.all([
			findDistrict(station.district),
			findVacanciesForStation(id)
		])
		mapAccountToResource(station, 'captain')
		mapAccountToResource(district, 'chief')

		station.district = district
		station.vacancies = vacancies
		return station
	},
	stations() {
		return db('fireStation')
	},
}
