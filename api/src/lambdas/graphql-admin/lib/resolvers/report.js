const CustomError = require('simple-lambda-actions/dist/util/ErrorHandler')
const db = require('../config/db')
const { mapFireStationToResource, mapAccountToResource } = require('../utils/mapEntityToResource')

module.exports = {
	async report({ id }) {
		return db('report').where({ id }).first()
	},
	async reports() {
		const reports = await db
			.select(
				'report.*', 
				'account.id as accountId', 
				'account.firstName',
				'account.lastName',
				'fireStation.id as fireStationId', 
				'fireStation.name',
				)
			.from('report')
			.join('account', 'report.submitter', 'account.id')
			.join('fireStation', 'report.fireStation', 'fireStation.id')
		
		reports.forEach(report => {
			mapAccountToResource(report, 'submitter', 'accountId')
			mapFireStationToResource(report, 'fireStation', 'fireStationId')
		})
		return reports
	},
	async reportsByAccountId({ id }) {
		const reports = await db('report')
			.where({ submitter: id })
			.join('fireStation', 'report.fireStation', 'fireStation.id')
		reports.forEach(report => mapFireStationToResource(report))
		return reports
		
	},
	async createReport(argumentos){
		try {
			const { params } = JSON.parse(JSON.stringify(argumentos))
			console.log('params', params)
			const writtenReport = await db('report')
				.returning(['id'])
				.insert(params)
			return writtenReport
		} catch(error){
			console.error('error writing report', error)
			throw new CustomError({
				message: error.message,
				statusCode: error.statusCode || 500
			})
		}
	}
}
