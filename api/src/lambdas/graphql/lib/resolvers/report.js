const db = require('../config/db')

module.exports = {
	async report({ id }) {
		return db('report').where({ id }).first()
	},
	reports() {
		return db('report')
	},
	reportsByAccountId({ id }) {
		return db('report').where({ submitter: id })
	},
	createReport(argumentos){
		const { params } = JSON.parse(JSON.stringify(argumentos))
		return db('report')
			.returning(['id'])
			.insert(params)
	}
}
