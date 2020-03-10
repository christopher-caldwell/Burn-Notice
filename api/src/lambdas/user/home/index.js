const Responder = require('simple-lambda-actions/dist/util/responseHandler')
const query = require('./lib/query')
const shuffle = require('simple-array-shuffler')

const corsUrl = process.env.CORS_URL

const numOfVacanciesToReturn = 5

exports.handler = async event => {
	const ResponseHandler = new Responder(corsUrl, event.httpMethod)
	try {
		const { sap } = event.queryStringParameters
		
		const [ updates, vacancies ] = await Promise.all([
			await query(sap, 'update'),
			await query('vacancy')
		])
		const shuffledVacancies = shuffle(vacancies)
		shuffledVacancies.splice(numOfVacanciesToReturn)
		
		return ResponseHandler.respond({ updates, vacancies }, 200)
	} catch(error){
		console.log('error', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}