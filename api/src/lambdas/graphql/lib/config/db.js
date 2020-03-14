const { knexSnakeCaseMappers } = require('objection/lib/utils/identifierMapping')

const config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    connectTimeout: 900000
	},
	...knexSnakeCaseMappers()
}

console.log('config', config)

const knex = require('knex')(config)


module.exports = knex