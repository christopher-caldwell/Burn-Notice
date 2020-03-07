const { hash } = require('bcrypt')
const Responder= require('simple-lambda-actions/dist/util/responseHandler')
const { bodyParser } = require('simple-lambda-actions/dist/util/formatter')
const putUser = require('./lib/putUser')
const generateToken = require('./lib/secretsManagerSetup')

const role = 'fire_fighter'
const numberOfSaltRounds = 10
const corsUrl = process.env.CORS_URL

exports.handler = async event => {
	const ResponseHandler = new Responder(corsUrl, event.httpMethod)
	try {
		const userProfile = bodyParser(event.body)
		const { password } = userProfile
		const hashedPassword = await hash(password, numberOfSaltRounds)
		const tokenParams = { id: userProfile.sap, role }
		const [ token ] = await Promise.all([
			generateToken(tokenParams),
			putUser(hashedPassword, userProfile)
		])
		delete userProfile.password
		return ResponseHandler.respond({ userInformation, token }, 200)
	} catch (error) {
		console.log('error: ', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}
