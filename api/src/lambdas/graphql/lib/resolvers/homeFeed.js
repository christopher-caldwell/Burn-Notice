const db = require('../config/db')
const shuffleArray = require('simple-array-shuffler')

const maxNumOfUpdates = 2
const maxNumOfVacancies = 4


const chopArray = (array, maxNum) => {
	const indexToStartChopping = array.length <= maxNum - 1
		? array.length
		: maxNum - 1
	array.splice(indexToStartChopping)
}

const formatVacancies = vacancies => {
	chopArray(vacancies, maxNumOfVacancies)
	return vacancies.map(vacancy => ({
		...vacancy,
		fireStation: {
			id: vacancy.fireStation,
			district: vacancy.district,
			captain: vacancy.captain,
			name: vacancy.name
		}
	}))
}

const fetchAccountUpdates = async id => {
	try {
		const updates = db('accountUpdate').where({ account: id }).orderBy('postDate', 'desc')
		return updates
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
				db('vacancy').join('fireStation', 'vacancy.fireStation', 'fireStation.id')
			])
			
			const shuffledVacancies = shuffleArray(vacancies)
			chopArray(allUpdates, maxNumOfUpdates)
			const vacanciesToReturn = formatVacancies(shuffledVacancies)

			return {
				updates: allUpdates,
				vacancies: vacanciesToReturn 
			}
		} catch(error){
			console.log('error', error)
			return {
				updates: null,
				vacancies: null
			}
		}
	}
}
