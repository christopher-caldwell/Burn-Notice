const CustomError = require('simple-lambda-actions/dist/util/ErrorHandler')
const db = require('../config/db')
const { mapAccountToResource } = require('../utils/mapEntityToResource')

const updateVacancy = (vacancyId, transactionActor) => (
	transactionActor('vacancy')
		.where({ id: vacancyId })
		.update({ 
			status: 'filled',
			fillDate: new Date()
		})
)

const updateTransferRequest = (requestId, approvingAuthId, transactionActor) => (
	transactionActor('transferRequest')
		.where({ id: requestId })
		.update({ 
			approvingAuthority: approvingAuthId,
			approvalDate: new Date(),
			applicationStatus: 'accepted'
		})
)

const updateSelectedAccount = (accountId, transactionActor) => (
	transactionActor('account')
		.where({ id: accountId })
		.update({ 
			lastTransfer: new Date()
		})
)

const updateSelectedAccountAssignment = (accountId, transactionActor) => (
	transactionActor('assignment')
		.where({ account: accountId })
		.update({ 
			endDate: new Date()
		})
)

const createNewAssignment = (newAssignmentParams, transactionActor) => {
	const { requestSubmitterId, targetStation, isNewStationEngine } = newAssignmentParams
	const assignmentParams = {
		assignedStation: targetStation,
		isEngine: isNewStationEngine,
		account: requestSubmitterId
	}
	return transactionActor('assignment')
		.insert(assignmentParams)
}

const cancelOtherTransferRequests = (successfulRequestId, transactionActor) => {
	return transactionActor('transferRequest')
		.join('vacancy', 'transferRequest.vacancy', 'vacancy.id')
		.whereNot('transferRequest.id', successfulRequestId)
		.update({
			applicationStatus: 'cancelled'
		})
}

const resetAllOtherEligibility = (successfulApplicantId, transactionActor) => {
	return transactionActor('account')
		.join('transferRequest', 'account.id', 'transferRequest.requestSubmitter')
		.join('vacancy', 'transferRequest.vacancy', 'vacancy.id')
		.whereNot('account.id', successfulApplicantId)
		.update({
			isEligibleForTransfer: true
		})
		
}

const createAccountUpdate = (accountId, requestId, didApprove, transactionActor) => {
	const approvalText = didApprove ? 'approved' : 'denied'
	const requestParams = {
		account: accountId,
		title: `Your transfer request has been ${approvalText}.`,
		tableNameOfUpdate: 'transferRequest',
		idOfUpdateSource: requestId,
		isActionable: false
	}
	return transactionActor('accountUpdate')
		.insert(requestParams)
}

const changeEligibilityOfUnsuccessful = (accountId, transactionActor) => (
	transactionActor('account')
		.where({ id: accountId })
		.update({
			isEligibleForTransfer: true
		})
)

const denyTransferRequestStatus = (transferReqId, transactionActor) => (
	transactionActor('transferRequest')
		.where({ id: transferReqId })
		.update({
			applicationStatus: 'denied'
		})
)

const approveTransferRequest = async params => {
	const { requestSubmitterId, targetStation, isNewStationEngine, vacancyId, requestId, approvingAuthId } = params
	const newAssignmentParams = { requestSubmitterId, targetStation, isEngine: isNewStationEngine }
	try {
		return db.transaction(async transactionActor => {
			await Promise.all([
				updateVacancy(vacancyId, transactionActor),
				updateTransferRequest(requestId, approvingAuthId, transactionActor),
				updateSelectedAccount(requestSubmitterId, transactionActor),
				createAccountUpdate(requestSubmitterId, requestId, true, transactionActor),
				updateSelectedAccountAssignment(requestSubmitterId, transactionActor),
				createNewAssignment(newAssignmentParams, transactionActor),
				cancelOtherTransferRequests(requestId, transactionActor),
				resetAllOtherEligibility(requestSubmitterId, transactionActor),
		])
	})
 } catch(error){
		throw new CustomError({
			message: error.message,
			statusCode: error.statusCode || 500
		})
	}
}

const denyTransferRequest = async (accountId, requestId) => {
	console.log('accountId', accountId)
	try {
		return await db.transaction(async transactionActor => {
			return await Promise.all([
				changeEligibilityOfUnsuccessful(accountId, transactionActor),
				createAccountUpdate(accountId, requestId, false, transactionActor),
				denyTransferRequestStatus(requestId, transactionActor)
			])
		})
	} catch(error){
		throw new CustomError({
			message: error.message,
			statusCode: error.statusCode || 500
		})
	}
}

module.exports = {
	async transferRequest({ id }) {
		const request = await db
			.select(
				'transferRequest.*', 
				'vacancy.id as vacancyId',
				'vacancy.numOfApplicants',
				'vacancy.status',
				'vacancy.isEngine',
				'fireStation.id as fireStationId',
				'fireStation.name',
				'account.id as accountId',
				'account.firstName',
				'account.lastName'
			)
			.from('transferRequest')
			.join('vacancy', 'transferRequest.vacancy', 'vacancy.id')
			.join('fireStation', 'vacancy.fireStation', 'fireStation.id')
			.join('account', 'transferRequest.requestSubmitter', 'account.id')
			.where('transferRequest.id', id)
			.first()
		mapAccountToResource(request, 'requestSubmitter', 'accountId')
		request.vacancy = {
			id: request.vacancyId,
			numOfApplicants: request.numOfApplicants,
			status: request.status,
			isEngine: request.isEngine,
			fireStation: {
				id: request.fireStationId,
				name: request.name
			}
		}
		return request
	},
	async transferRequests() {
		const requests = await db
			.select('transferRequest.*', 'fireStation.name', 'account.id as accountId', 'account.firstName', 'account.lastName')
			.from('transferRequest')
			.join('vacancy', 'transferRequest.vacancy', 'vacancy.id')
			.join('fireStation', 'vacancy.fireStation', 'fireStation.id')
			.join('account', 'transferRequest.requestSubmitter', 'account.id')
		requests.forEach(request => {
			mapAccountToResource(request, 'requestSubmitter', 'accountId')
			request.vacancy = {
				fireStation: {
					name: request.name
				}
			}
		})
		return requests
	},
	async decideTransferRequest(argumentos){
		const { params } = JSON.parse(JSON.stringify(argumentos))
		console.log('params', params)
		const { didApproveRequest, requestSubmitterId, requestId } = params
		// if false:
			// send rejection email
		
		try {
			didApproveRequest
				? await approveTransferRequest(params)
				: await denyTransferRequest(requestSubmitterId, requestId)
			return true
		} catch(error){
			console.error('error in transact transfer req: ', error)
			throw new CustomError({
				message: error.message,
				statusCode: error.statusCode || 500
			})
		}
	}
}
