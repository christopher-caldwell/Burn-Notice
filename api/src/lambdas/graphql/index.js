const { graphql } = require('graphql')
const Responder = require('simple-lambda-actions/dist/util/responseHandler')
const { bodyParser } = require('simple-lambda-actions/dist/util/formatter')
const { schema, resolvers } = require('./lib')

const corsUrl = process.env.CORS_URL

exports.handler = async event => {
	// console.log('event', event)
	const ResponseHandler = new Responder({corsUrl, httpMethod: event.httpMethod})
	const { query, variables, operationName } = bodyParser(event.body)
	const result = await graphql(schema, query, resolvers, null, variables, operationName)
	if(!result.errors){
		return ResponseHandler.respond(result, 200)
	} else {
		console.log('error', result.errors[0])
		return ResponseHandler.respond(result.errors[0].message, 500)
	}
}
