const db = require('../config/db')
const { mapAccountToResource } = require('../utils/mapEntityToResource')

const findDistrict = districtId => {
	return db('district')
			.join('account', 'district.chief', 'account.id')
			.where('district.id', districtId)
			.first()
}

const findVacanciesForStation = stationId => {
	return db('vacancy').where({ fireStation: stationId })
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
	async fireStations() {
		const stations = await db.select('fireStation.id', 'fireStation.name as fireName', 'district.name', 'account.firstName', 'account.lastName', 'account.id as accountId', 'district').from('fireStation')
			.join('account', 'fireStation.captain', 'account.id')
			.join('district', 'fireStation.district', 'district.id')
		stations.forEach(station => {
			station.district = {
				name: station.name
			}
			station.name = station.fireName
			station.captain = {
				id: station.accountId,
				firstName: station.firstName,
				lastName: station.lastName
			}
		})
		console.log('stations', stations)
		return stations
	},
	fireStationsByDistrict({ districtId }){
		return db('fireStation').where({ district: districtId })
	}
}
