const db = require('../config/db')

module.exports = {
	async account({ id }){
    const [ account ] = await db('account').where({
			id
		})
		return account
  },
	accountBySap({ sap }){
    return db('account').where({ sap }).first()
  },
	accounts(){
    return db('account')
  },
	accountsByStation({ stationId }){
		return db('account')
			.join('assignment', 'assignment.account', 'account.id')
			.where({ assignedStation: stationId })
			.andWhere('assignment.endDate', null)
  },
}