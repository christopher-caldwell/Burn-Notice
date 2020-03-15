const db = require('../config/db')

module.exports = {
	assignmentsBySAP({ sap }){
		return db('assignment').join('account', 'assignment.account')
	}
	createAssignment(argumentos){
		const { params } = JSON.parse(JSON.stringify(argumentos))
		return db('assignment')
			.returning(['id', 'startDate', 'assignedStation', 'endDate'])
			.insert(params)
	}
}
