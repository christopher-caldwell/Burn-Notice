const db = require('./db')

module.exports = userId => {
	return db('account').where({ id: userId }).update({
    lastLoggedInAt: new Date(),
  })
}