const shuffleArray = require('simple-array-shuffler')
const CustomError = require('simple-lambda-actions/dist/util/ErrorHandler')
const db = require('../config/db')
const { mapFireStationToResource } = require('../utils/mapEntityToResource')

const maxNumOfUpdates = 2
const maxNumOfVacancies = 4


const chopArray = (array, maxNum) => {
	const indexToStartChopping = array.length <= maxNum - 1
		? array.length
		: maxNum - 1
	array.splice(indexToStartChopping)
}

const fetchAccountUpdates = id => {
	try {
		return db('accountUpdate').where({ account: id }).orderBy('postDate', 'desc')
	} catch(error){
		console.log('err fetching updates', error)
		return null
	}
}

const fetchVacancies = async () => {
	try {
		const vacancies = await db
			.select('vacancy.*', 'fireStation.id as fireStationId', 'fireStation.name')
			.from('vacancy')
			.join('fireStation', 'vacancy.fireStation', 'fireStation.id')
			.where({ status: 'active' })
		vacancies.forEach(vacancy => {
			mapFireStationToResource(vacancy, 'fireStation', 'fireStationId')
		})
		console.log('vacancies', vacancies)
		return vacancies
	} catch(error){
		console.log('err fetching updates', error)
		return null
	}
}

const deleteTargetUpdate = id => (
	db('accountUpdate')
		.where({ id })
		.del()
)

const fetchUpdatesAfterDelete = (idOfDeleted, idOfAccount) => {
	try {
		return db('accountUpdate')
			.where({ account: idOfAccount })
			.andWhereNot({ id: idOfDeleted })
			.orderBy('postDate', 'desc')
	} catch(error){
		console.log('err fetching updates', error)
		return null
	}
}

module.exports = {
	async homeFeed({ id }){
		try {
			const [ allUpdates, vacancies ] = await Promise.all([
				fetchAccountUpdates(id),
				fetchVacancies()
			])
			
			return {
				updates: allUpdates,
				vacancies: vacancies
			}
		} catch(error){
			console.log('error', error)
			return {
				updates: null,
				vacancies: null
			}
		}
	},
	async clearUpdate({ id, accountId }){
		try {
			const [ updates ] = await Promise.all([
				fetchUpdatesAfterDelete(id, accountId),
				deleteTargetUpdate(id),
			])
			return updates
		} catch(error){
			throw new CustomError({
				message: error.message,
				statusCode: error.statusCode || 500
			})
		}
	}
}
