const fireStationSchema = `
	type FireStation {
		id: ID
		district: District
		captain: Account
		name: String
		vacancies: [Vacancy]
	}
`

const fireStationQuery = `
	fireStation(id: ID): FireStation
	fireStations: [FireStation]
`


module.exports = { fireStationSchema, fireStationQuery }