const db = require('../config/db')
const { mapFireStationToResource } = require('../utils/mapEntityToResource')

module.exports = {
	assignment({ id }){
		return db('assignment').where({ id }).first()
	},
	assignments() {
		return db('assignment')
	},
	async assignmentsByAccountId({ accountId }) {
		const assignments = await db('assignment')
			.where('account.id', accountId)
			.join('account', 'assignment.account', 'account.id')
			.join('fireStation', 'assignment.assignedStation', 'fireStation.id')
			.orderBy('startDate', 'desc')
		assignments.forEach(assignment => mapFireStationToResource(assignment, 'assignedStation'))
		return assignments
	},
	createAssignment(argumentos){
		const { params } = JSON.parse(JSON.stringify(argumentos))
		return db('assignment')
			.returning(['id', 'startDate', 'assignedStation', 'endDate'])
			.insert(params)
	}
}
