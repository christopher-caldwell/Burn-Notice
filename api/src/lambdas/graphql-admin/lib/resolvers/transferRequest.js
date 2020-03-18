const db = require('../config/db')
const { mapAccountToResource, mapFireStationToResource } = require('../utils/mapEntityToResource')

const createTransferRequest = (params, transactionActor) => (
	transactionActor('transferRequest')
		.returning(['id', 'applicationStatus'])
		.insert(params)
)

const increaseNumApplicants = (vacancyId, transactionActor) => (
	transactionActor('vacancy').where({ id: vacancyId })
		.increment('numOfApplicants', 1)
)

const updateRequestorStatus = (accountId, transactionActor) => (
	transactionActor('account').where({ id: accountId })
		.update({
			isEligibleForTransfer: false
		})
)

module.exports = {
	async transferRequest({ id }) {
		return db('transferRequest').where({ id }).first()
	},
	async transferRequests() {
		const requests = await db
			.select('transferRequest.*', 'fireStation.name', 'account.firstName', 'account.lastName')
			.from('transferRequest')
			.join('vacancy', 'transferRequest.vacancy', 'vacancy.id')
			.join('fireStation', 'vacancy.fireStation', 'fireStation.id')
			.join('account', 'transferRequest.requestSubmitter', 'account.id')
		requests.forEach(request => {
			mapAccountToResource(request, 'requestSubmitter')
			request.vacancy = {
				fireStation: {
					name: request.name
				}
			}
		})
		return requests
	},
	createTransferRequest(argumentos){
		const { params } = JSON.parse(JSON.stringify(argumentos))
		const { requestSubmitter, vacancy } = params
		try {
			return db.transaction(async transactionActor => {
				const [ transferRequest ] = await Promise.all([
					createTransferRequest(params, transactionActor),
					increaseNumApplicants(vacancy, transactionActor),
					updateRequestorStatus(requestSubmitter, transactionActor)
				])
				return transferRequest
			})
		} catch(error){
			console.error('error in transact transfer req: ', error)
		}
	}
}
