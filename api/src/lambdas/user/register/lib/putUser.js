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

const role = 'fireFighter'

const constructWriteParams = ( hashedPassword, userInformation) => {
	const params = {
		password: hashedPassword,
		accountRole: role,
		...userInformation
	}
	return params
}

const writeUser = (hashedPassword, userInformation) => {
	const writeParams = constructWriteParams(hashedPassword, userInformation)
	return knex('account').insert(writeParams)
}

module.exports = writeUser