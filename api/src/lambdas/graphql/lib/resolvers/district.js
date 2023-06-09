const db = require('../config/db')

module.exports = {
	async district({ id }) {
		const [ district ] = await db('district').where({
			id
		})
		return district
	},
	districts() {
		return db('district')
	},
	async districtChief({ districtId }) {
		console.log('id', districtId)
		const [district] = await db('district').where({ id: districtId })
		console.log('district', district)
		const [chief] = await db('account').where({ id: district.chief })
		return chief
	}
}
