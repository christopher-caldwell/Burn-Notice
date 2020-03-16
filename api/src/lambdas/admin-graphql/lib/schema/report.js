const reportSchema = `
	type Report {
		id: ID
		submitter: Account
		typeOfIncident: String
		createdAt: Date
		timeDispatched: Date
		timeArrived: Date
		wasExposedToChem: Boolean
		wasFireRetardantPresent: Boolean
		actionsOfPrimaryTeam: String
		actionsOfSecondaryTeam: String
		descriptionOfEvents: String
		teamOneMembers: [Account]
		teamTwoMembers: [Account]
	}
`

const reportQuery = `
	report(id: ID): Report
	reports: [Report]
`

const reportMutation = `
	
`

module.exports = { reportSchema, reportQuery, reportMutation }