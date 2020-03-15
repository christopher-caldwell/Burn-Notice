const AssignmentInput = `
input AssignmentInput {
	startDate: Date
	endDate: Date
	assignedStation: ID
	account: ID
}
`

const TransferRequestInput = `
input TransferRequestInput {
	vacancy: ID
	requestSubmitter: ID
}
`

module.exports = `
	${AssignmentInput}
	${TransferRequestInput}
`