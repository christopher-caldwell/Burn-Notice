const Responder = require('simple-lambda-actions/dist/util/responseHandler')
const { getItem } = require('simple-lambda-actions/dist/dynamo/')
const { bodyParser } = require('simple-lambda-actions/dist/util/formatter')
const generateToken = require('./lib/secretsManagerSetup')
const verifyPassword = require('./lib/verifyPassword')

const tableName = process.env.TABLE_NAME
const corsUrl = process.env.CORS_URL
const partitionKey = process.env.TABLE_PARTITION_KEY
const rangeKey = process.env.TABLE_RANGE_KEY

exports.handler = async event => {
	const ResponseHandler = new Responder(corsUrl, event.httpMethod)
	try {
		// username could be email or password
		const { sap, password } = bodyParser(event.body)
		const userInformation = await getItem(tableName, { [partitionKey]: sap, [rangeKey]: 'user' })

		const tokenParams = { id: userInformation.id, role: userInformation.role }
		const [ token ] = await Promise.all([
			await	generateToken(tokenParams),
			await verifyPassword(password, userInformation.password)
		])

		delete userInformation.password	
		return ResponseHandler.respond({ userInformation, token }, 200)
	} catch(error){
		console.log('error', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}