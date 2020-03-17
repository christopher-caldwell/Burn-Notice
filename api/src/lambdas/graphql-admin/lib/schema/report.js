const reportSchema = `
	type Report {
		id: ID
		submitter: Account
		fireStation: FireStation
		typeOfIncident: String
		createdAt: Date
		timeDispatched: Date
		timeArrived: Date
		wasExposedToChem: Boolean
		wasFireRetardantPresent: Boolean
		chemicalExposureNotes: String
		actionsOfPrimaryTeam: String
		actionsOfSecondaryTeam: String
		descriptionOfEvent: String
		teamOneMembers: [Account]
		teamTwoMembers: [Account]
	}
	input ReportInput {
		submitter: Int
		fireStation: Int
		typeOfIncident: String
		createdAt: Date
		timeDispatched: Date
		timeArrived: Date
		wasExposedToChem: Boolean
		wasFireRetardantPresent: Boolean
		chemicalExposureNotes: String
		actionsOfPrimaryTeam: String
		actionsOfSecondaryTeam: String
		descriptionOfEvent: String
		teamOneMembers: [Int]
		teamTwoMembers: [Int]
	}
`

const reportQuery = `
	report(id: ID): Report
	reports: [Report]
	reportsByAccountId(id: ID): [Report]
`

const reportMutation = `
	createReport(params: ReportInput): Report
`

module.exports = { reportSchema, reportQuery, reportMutation }