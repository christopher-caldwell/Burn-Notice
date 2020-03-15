const { buildSchema } = require('graphql')
const typeDefs = require('./typeDefs')
const inputTypes = require('./inputs')


module.exports = buildSchema(`
	${typeDefs}
	${inputTypes}
	scalar Date
  type Query {
    account(id: ID): Account,
		accounts: [Account],
		accountBySap(sap: Int!): Account,
		accountsByStation(stationId: ID): [Account]
		assignment(id: ID): Assignment
		assignments: [Assignment]
		assignmentsBySAP(sap: ID): [Assignment]
		district(id: ID!): District
		districts: [District],
		vacancy(id: ID): Vacancy
		vacancies: [Vacancy]
		transferRequest(id: ID): TransferRequest
		transferRequests: [TransferRequest]
		fireStation(id: ID): FireStation
		fireStations: [FireStation]
		report(id: ID): Report
		reports: [Report]
		
	}
	type Mutation {
		createAssignment(params: AssignmentInput): Assignment
		createTransferRequest(params: TransferRequestInput): TransferRequest
	}
`)
