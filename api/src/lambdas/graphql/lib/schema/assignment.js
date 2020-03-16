const assignmentSchema = `
	type Assignment {
		id: ID
		startDate: Date
		endDate: Date
		assignedStation: FireStation
		isEngine: Boolean
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
	assignmentsByAccountId(accountId: ID): [Assignment]
`

module.exports = { assignmentSchema, assignmentQuery }