const assignmentSchema = `
	type Assignment {
		id: ID
		startDate: Date
		endDate: Date
		assignedStation: FireStation
		account: Account
	}
	input AssignmentInput {
		startDate: Date
		endDate: Date
		assignedStation: ID
		account: ID
	}
`

const assignmentQuery = `
	assignment(id: ID): Assignment
	assignments: [Assignment]
	assignmentsBySAP(sap: ID): [Assignment]
`

const assignmentMutation = `
	createAssignment(params: AssignmentInput): Assignment
`

module.exports = { assignmentSchema, assignmentQuery, assignmentMutation }