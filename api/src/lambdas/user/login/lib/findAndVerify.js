const { compareSync } = require('bcryptjs/dist/bcrypt.min')
const CustomError = require('simple-lambda-actions/dist/util/ErrorHandler')
const db = require('./db')

const findUser = sap => {
	return db('account').where({ sap })
}

const verifyPassword = async (givenPassword, dbPassword) => {
	return await compareSync(givenPassword, dbPassword)
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