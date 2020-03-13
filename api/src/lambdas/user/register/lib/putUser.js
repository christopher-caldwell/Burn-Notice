const { genSalt, hash } = require('bcryptjs/dist/bcrypt.min')
const { knexSnakeCaseMappers } = require('objection/lib/utils/identifierMapping')
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
	},
	...knexSnakeCaseMappers()
})
const role = 'fire_fighter'

const constructWriteParams = async userInformation => {
	const saltRounds = await genSalt(10)
	const hashedPassword = await hash(userInformation.password, saltRounds)
	delete userInformation.password
	const params = {
		password: hashedPassword,
		accountRole: role,
		...userInformation
	}
	return params
}

const writeUser = async userInformation => {
	const writeParams = await constructWriteParams(userInformation)
	return knex('account').insert(writeParams)
}

module.exports = writeUser