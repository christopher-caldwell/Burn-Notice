const accountSchema = `
	type Account {
		id: ID
		sap: Int
		email: String
		phone: String
		createdAt: Date
		lastLoggedInAt: Date
		firstName: String
		lastName: String
		isEligibleForTransfer: Boolean
		accountRole: String
	}
`

const accountQuery = `
	account(id: ID): Account
	accounts: [Account]
	accountBySap(sap: Int!): Account
	accountsByStation(stationId: ID): [Account]
`

const accountMutation = `
	
`

module.exports = { accountSchema, accountQuery, accountMutation }