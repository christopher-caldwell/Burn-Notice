const db = require('../config/db')

module.exports = {
	async station({ id }) {
		const [ station ] = await db('fireStation').where({
			id
		})
		return station
	},
	stations() {
		return db('fireStation')
	},
}
