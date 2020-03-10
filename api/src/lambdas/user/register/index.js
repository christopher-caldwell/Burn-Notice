const { hash } = require('bcrypt')
const Responder= require('simple-lambda-actions/dist/util/responseHandler')
const { bodyParser } = require('simple-lambda-actions/dist/util/formatter')
const putUser = require('./lib/putUser')
const generateToken = require('./lib/secretsManagerSetup')

const role = 'full-user'
const numberOfSaltRounds = 10
const corsUrl = process.env.CORS_URL

exports.handler = async event => {
	const ResponseHandler = new Responder(corsUrl, event.httpMethod)
	try {
		const { userInformation } = bodyParser(event.body)
		const { sap, password } = userInformation
		const hashedPassword = await hash(password, numberOfSaltRounds)
		const tokenParams = { id: sap, role }
		const [ token, user ] = await Promise.all([
			generateToken(tokenParams),
			putUser(emailAddress, hashedPassword, userInformation)
		])
		delete user.password
		return ResponseHandler.respond({ userInformation: user, token }, 200)
	} catch (error) {
		console.log('error: ', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}
