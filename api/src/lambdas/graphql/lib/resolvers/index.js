const accountResolvers = require('./account')
const districtResolvers = require('./district')
const stationResolvers = require('./station')

const resolvers = {
	...accountResolvers,
	...districtResolvers,
	...stationResolvers
}
module.exports = resolvers
