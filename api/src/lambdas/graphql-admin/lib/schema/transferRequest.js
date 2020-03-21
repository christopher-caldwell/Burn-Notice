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
	input TransferRequestDecisionInput {
		requestSubmitterId: ID
		targetStation: ID
		vacancyId: ID
		requestId: ID
		approvingAuthId: ID
		isNewStationEngine: Boolean
		didApproveRequest: Boolean
	}
`

const transferRequestQuery = `
	transferRequest(id: ID): TransferRequest
	transferRequests: [TransferRequest]
	transferRequestsByStation(stationId: ID): [TransferRequest]
`

const transferRequestMutation = `
	createTransferRequest(params: TransferRequestInput): TransferRequest
	decideTransferRequest(params: TransferRequestDecisionInput): Boolean
`

module.exports = { transferRequestSchema, transferRequestQuery, transferRequestMutation }