const districtSchema = `
	type District {
		id: ID
		chief: Account
		name: String
	}
`

const districtQuery = `
	district(id: ID): District
	districts: [District]
`


module.exports = { districtSchema, districtQuery }