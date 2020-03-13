const { knexSnakeCaseMappers } = require('objection/lib/utils/identifierMapping')

const config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectTimeout: 900000
	},
	...knexSnakeCaseMappers()
}

const knex = require('knex')(config)


module.exports = knex