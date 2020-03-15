const db = require('../config/db')

module.exports = {
	async report({ id }) {
		return db('report').where({ id }).first()
	},
	reports() {
		return db('report')
	}
}
