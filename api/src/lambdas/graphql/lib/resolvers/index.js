const accountResolvers = require('./account')
const districtResolvers = require('./district')

const resolvers = {
	...accountResolvers,
	...districtResolvers.district,
	test(){
		return { firstName: 'Howdy' }
	}
}
module.exports = resolvers
