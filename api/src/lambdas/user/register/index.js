const Responder= require('simple-lambda-actions/dist/util/responseHandler')
const { bodyParser } = require('simple-lambda-actions/dist/util/formatter')
const putUser = require('./lib/putUser')
const generateToken = require('./lib/secretsManagerSetup')

const role = 'fire_fighter'
const corsUrl = process.env.CORS_URL

exports.handler = async event => {
	const ResponseHandler = new Responder(corsUrl, event.httpMethod)
	try {
		const userInformation = bodyParser(event.body)
		const tokenParams = { id: userInformation.sap, role }
		const [ token, userId ] = await Promise.all([
			generateToken(tokenParams),
			putUser(userInformation)
		])
		delete userInformation.password
		userInformation.id = userId[0]
		userInformation.role = role
		return ResponseHandler.respond({ userInformation, token }, 200)
	} catch (error) {
		console.log('error: ', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}
