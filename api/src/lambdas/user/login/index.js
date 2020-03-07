const Responder = require('simple-lambda-actions/dist/util/responseHandler')
const { bodyParser } = require('simple-lambda-actions/dist/util/formatter')
const generateToken = require('./lib/secretsManagerSetup')
const findAndVerify = require('./lib/findAndVerify')

const corsUrl = process.env.CORS_URL

exports.handler = async event => {
	const ResponseHandler = new Responder(corsUrl, event.httpMethod)
	try {
		const { sap, password } = bodyParser(event.body)
		const userProfile = await findAndVerify(sap, password)

		const tokenParams = { id: userProfile.sap, role: userProfile.role }
		const token = await	generateToken(tokenParams)

		return ResponseHandler.respond({ userProfile, token }, 200)
	} catch(error){
		console.log('error', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}