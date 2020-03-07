const { knexSnakeCaseMappers } = require('objection')
const knex = require('knex')({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
	},
	...knexSnakeCaseMappers()
})

module.exports = userId => {
	return knex('account').where({ id: userId }).update({
    lastLoggedInAt: new Date(),
  })
}