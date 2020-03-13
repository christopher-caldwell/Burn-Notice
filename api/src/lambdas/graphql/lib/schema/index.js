const { buildSchema } = require('graphql')

const accountSchema = `
type Account {
	id: ID
	sap: Int
	email: String
	phone: String
	created_at: String
	lastLogged_in_at: String
	firstName: String
	lastName: String
	accountRole: String
}`

const districtSchema = `
type District {
	id: ID!
	chief: Account
	name: String
}`

const fireStationSchema = `
type FireStation {
	id: ID!
	district: District
	captain: Account
	name: String
}`

const assignmentSchema = `
type Assignment {
	id: ID!
	startDate: String
	endDate: String
	assignedStation: FireStation
	account: Account
}`

const vacancySchema = `
type Vacancy {
	id: ID!
	station: FireStation
	isEngine: Boolean
	isTemporary: Boolean
	postDate: String
	fillDate: String
}`

const transferRequestSchema = `
type TransferRequest {
	id: ID!
	vacancy: Vacancy
	requestSubmitter: Account
	applicationStatus: String
	approvingAuthority: Account
	sentDate: String
	approvalDate: String
}`

const reportSchema = `
type Report {
	id: ID!
	submitter: Account
	typeOfIncident: String
	createdAt: String
	timeDispatched: String
	timeArrived: String
	wasExposedToChem: Boolean
	wasFireRetardantPresent: Boolean
	actionsOfPrimaryTeam: String
	actionsOfSecondaryTeam: String
	descriptionOfEvents: String
	teamOneMembers: [Account]
	teamTwoMembers: [Account]
}`

module.exports = buildSchema(`
 ${accountSchema}
 ${districtSchema}
 ${fireStationSchema}
 ${assignmentSchema}
 ${vacancySchema}
 ${transferRequestSchema}
 ${reportSchema}
  type Query {
    account(id: ID): Account,
		accounts: [Account],
		accountBySap(sap: Int!): Account,
		district(id: ID!): District
		districts: [District],
		districtChief(districtId: ID!): Account
	}
`)
