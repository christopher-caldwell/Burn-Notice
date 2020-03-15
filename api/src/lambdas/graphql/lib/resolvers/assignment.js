const db = require('../config/db')

module.exports = {
	createAssignment(argumentos){
		const { params } = JSON.parse(JSON.stringify(argumentos))
		return db('assignment')
			.returning(['id', 'startDate', 'assignedStation', 'endDate'])
			.insert(params)
	}
}
