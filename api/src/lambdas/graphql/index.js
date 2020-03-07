const { graphql } = require('graphql')
const { schema, resolvers } = require('./lib')

exports.handler = async event => {
	const result = await graphql(schema, event.body, resolvers)
	return { statusCode: 200, body: JSON.stringify(result.data, null, 2) }
}
