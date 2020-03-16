const { buildSchema } = require('graphql')
const { accountSchema, accountQuery, accountMutation } = require('./account')
const { assignmentSchema, assignmentQuery } = require('./assignment')
const { districtSchema, districtQuery } = require('./district')
const { fireStationSchema, fireStationQuery } = require('./fireStation')
const { homeFeedSchema, homeFeedQuery } = require('./homeFeed')
const { reportSchema, reportQuery, reportMutation } = require('./report')
const { transferRequestSchema, transferRequestQuery, transferRequestMutation } = require('./transferRequest')
const { vacancySchema, vacancyQuery } = require('./vacancy')

module.exports = buildSchema(`
	${accountSchema}
	${assignmentSchema}
	${districtSchema}
	${fireStationSchema}
	${homeFeedSchema}
	${reportSchema}
	${transferRequestSchema}
	${vacancySchema}	
	scalar Date
	type Query {
		${accountQuery}
		${assignmentQuery}
		${districtQuery}
		${fireStationQuery}
		${homeFeedQuery}
		${reportQuery}
		${transferRequestQuery}
		${vacancyQuery}
	}
	type Mutation {
		${accountMutation}
		${reportMutation}
		${transferRequestMutation}
	}
`)
