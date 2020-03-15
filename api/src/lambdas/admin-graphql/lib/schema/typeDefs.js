const accountSchema = `
type Account {
	id: ID
	sap: Int
	email: String
	phone: String
	created_at: Date
	lastLoggedInAt: Date
	firstName: String
	lastName: String
	isEligibleForTransfer: Boolean
	accountRole: String
}`

const districtSchema = `
type District {
	id: ID
	chief: Account
	name: String
}`

const fireStationSchema = `
type FireStation {
	id: ID
	district: District
	captain: Account
	name: String
	vacancies: [Vacancy]
}`

const assignmentSchema = `
type Assignment {
	id: ID
	startDate: Date
	endDate: Date
	assignedStation: FireStation
	account: Account
}`

const vacancySchema = `
type Vacancy {
	id: ID
	station: FireStation
	isEngine: Boolean
	isTemporary: Boolean
	postDate: Date
	fillDate: Date
	notes: String
	numOfApplicants: Int
	status: String
}`

const transferRequestSchema = `
type TransferRequest {
	id: ID
	vacancy: Vacancy
	requestSubmitter: Account
	applicationStatus: String
	approvingAuthority: Account
	sentDate: Date
	approvalDate: Date
}`

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
}`

const accountUpdateSchema = `
type AccountUpdate {
	id: ID!
	account: Account
	title: String
	tableNameOfUpdate: String
	idOfUpdateSource: ID
	isActionable: Boolean
	postDate: Date
}`

const homeFeedSchema = `
type HomeFeed {
	updates: [AccountUpdate]
	vacancies: [Vacancy]
}`
module.exports = `
	${accountSchema}
	${districtSchema}
	${fireStationSchema}
	${assignmentSchema}
	${vacancySchema}
	${transferRequestSchema}
	${reportSchema}
	${accountUpdateSchema}
	${homeFeedSchema}
`