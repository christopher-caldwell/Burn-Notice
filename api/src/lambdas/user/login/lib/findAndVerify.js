const { compare } = require('bcrypt')
const CustomError = require('simple-lambda-actions/dist/util/ErrorHandler')
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

const findUser = sap => {
	return knex('account').where({ sap })
}

const verifyPassword = async (givenPassword, dbPassword) => {
	return await compare(givenPassword, dbPassword)
}

module.exports = async (sap, givenPassword) => {
	const [ user ] = await findUser(sap)
	if(verifyPassword(givenPassword, user.password)){
		delete user.password
		return user
	} else {
		throw new CustomError({
			message: 'Passwords do not match',
			statusCode: 403
		})
	}
}