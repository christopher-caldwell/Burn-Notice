const transferRequestSchema = `
	type TransferRequest {
		id: ID
		vacancy: Vacancy
		requestSubmitter: Account
		applicationStatus: String
		approvingAuthority: Account
		sentDate: Date
		approvalDate: Date
	}
	input TransferRequestInput {
		vacancy: ID
		requestSubmitter: ID
	}
`

const transferRequestQuery = `
	transferRequest(id: ID): TransferRequest
	transferRequests: [TransferRequest]
	transferRequestsByStation(stationId: ID): [TransferRequest]
`

const transferRequestMutation = `
	createTransferRequest(params: TransferRequestInput): TransferRequest
`

module.exports = { transferRequestSchema, transferRequestQuery, transferRequestMutation }