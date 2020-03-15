const db = require('../config/db')

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
	transferRequests() {
		return db('transferRequest')
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
