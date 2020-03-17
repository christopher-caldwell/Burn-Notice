const accountResolvers = require('./account')
const assignmentResolver = require('./assignment')
const districtResolvers = require('./district')
const stationResolvers = require('./fireStation')
const homeFeedResolvers = require('./homeFeed')
const vacancyResolvers = require('./vacancy')
const transferRequestResolver = require('./transferRequest')
const reportResolvers = require('./report')
const Date = require('./date')

const resolvers = {
	...accountResolvers,
	...districtResolvers,
	...stationResolvers,
	...homeFeedResolvers,
	...vacancyResolvers,
	...assignmentResolver,
	...transferRequestResolver,
	...reportResolvers,
	Date
}
module.exports = resolvers
