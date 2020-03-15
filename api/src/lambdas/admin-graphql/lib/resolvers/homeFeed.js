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
		station: {
			id: vacancy.station,
			district: vacancy.district,
			captain: vacancy.captain,
			name: vacancy.name
		}
	}))
}

module.exports = {
	async homeFeed({ id }){
		try {
			const [ allUpdates, vacancies ] = await Promise.all([
				db('accountUpdate').where({ account: id }), //.orderBy('postDate', 'desc')
				db('vacancy').join('fireStation', 'vacancy.station', 'fireStation.id')
			])
			
			const shuffledVacancies = shuffleArray(vacancies)
			console.log('vacancies', shuffledVacancies)
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
