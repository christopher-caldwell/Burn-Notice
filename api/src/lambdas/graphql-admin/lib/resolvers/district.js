const db = require('../config/db')
const { mapAccountToResource } = require('../utils/mapEntityToResource')

module.exports = {
	async district({ id }) {
		const district = await db('district')
			.join('account', 'district.chief', 'account.id')
			.where('district.id', id)
			.first()
		mapAccountToResource(district, 'chief')
		district.id = id
		console.log('district', district)
		return district
	},
	async districts() {
		const districts = await db
			.select('district.id as districtId', 'district.name', 'chief', 'account.*')
			.from('district')
			.join('account', 'district.chief', 'account.id')
		districts.forEach(district => {
			district.id = district.districtId
			mapAccountToResource(district, 'chief')
		})
		return districts
	}
}
