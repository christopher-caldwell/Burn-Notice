const CustomError = require('simple-lambda-actions/dist/util/ErrorHandler')
const db = require('../config/db')
const { mapFireStationToResource } = require('../utils/mapEntityToResource')

module.exports = {
	async report({ id }) {
		return db('report').where({ id }).first()
	},
	reports() {
		return db('report')
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
