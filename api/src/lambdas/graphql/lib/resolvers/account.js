const db = require('../config/db')

module.exports = {
	async account({ id }){
    const [ account ] = await db('account').where({
			id
		})
		return account
  },
	async accountBySap({ sap }){
    const [ account ] = await db('account').where({
			sap
		})
		return account
  },
	accounts(){
    return db('account')
  },
}