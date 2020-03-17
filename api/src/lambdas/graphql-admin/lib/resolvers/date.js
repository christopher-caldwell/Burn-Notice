const { GraphQLScalarType, Kind } = require('graphql')

module.exports = new GraphQLScalarType({
	name: 'Date',
	description: 'Date custom scalar type',
	// value from the client
	parseValue(value) {
		return new Date(value) 
	},
	// value sent to the client
	serialize(value) {
		return new Date(value) 
	},
	// ast value is always in string format
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			return new Date(ast.value) 
		}
		return null
	},
})