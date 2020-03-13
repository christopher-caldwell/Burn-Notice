const { compare } = require('bcrypt')
const CustomError = require('simple-lambda-actions/dist/util/ErrorHandler')

const verifyPassword = async (givenPassword, dbPassword) => {
	return await compare(givenPassword, dbPassword)
}

module.exports = async (givenPassword, userPassword) => {
	const isValid = await verifyPassword(givenPassword, userPassword)
	if(!isValid){
		throw new CustomError({
			message: 'Passwords do not match',
			statusCode: 403
		})	
	}
}