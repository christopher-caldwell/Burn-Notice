const db = require('../config/db')
const { mapFireStationToResource, mapAccountToResource } = require('../utils/mapEntityToResource')

module.exports = {
	assignment({ id }){
		return db('assignment').where({ id }).first()
	},
	assignments() {
		return db('assignment')
	},
	async assignmentsByAccountId({ accountId }) {
		const assignments = await db
			.select('assignment.*', 'account.id as accountId', 'fireStation.id as fireStationId', 'fireStation.name')
			.from('assignment')
			.where('account.id', accountId)
			.join('account', 'assignment.account', 'account.id')
			.join('fireStation', 'assignment.assignedStation', 'fireStation.id')
			.orderBy('startDate', 'desc')
		
		assignments.forEach(assignment => {
			mapAccountToResource(assignment, 'account', 'accountId')
			mapFireStationToResource(assignment, 'assignedStation', 'fireStationId')
		})
		return assignments
	},
	createAssignment(argumentos){
		const { params } = JSON.parse(JSON.stringify(argumentos))
		return db('assignment')
			.returning(['id', 'startDate', 'assignedStation', 'endDate'])
			.insert(params)
	}
}
