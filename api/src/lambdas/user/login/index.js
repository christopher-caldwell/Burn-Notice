const Responder = require('simple-lambda-actions/dist/util/responseHandler')
const { bodyParser } = require('simple-lambda-actions/dist/util/formatter')
const generateToken = require('./lib/secretsManagerSetup')
const findAndVerify = require('./lib/findAndVerify')
const updateLogin = require('./lib/updateLoginTime')

const corsUrl = process.env.CORS_URL

exports.handler = async event => {
	const ResponseHandler = new Responder(corsUrl, event.httpMethod)
	try {
		const { sap, password } = bodyParser(event.body)
		const userInformation = await findAndVerify(sap, password)
		const { id } = userInformation
		const tokenParams = { id: userInformation.sap, role: userInformation.role }

		const [ token ] = await	Promise.all([
			generateToken(tokenParams),
			updateLogin(id)
		])

		userInformation.lastLoggedInAt = new Date()

		return ResponseHandler.respond({ userInformation, token }, 200)
	} catch(error){
		console.log('error', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}