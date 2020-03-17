const vacancySchema = `
	type  Vacancy {
		id: ID
		fireStation: FireStation
		isEngine: Boolean
		isTemporary: Boolean
		postDate: Date
		fillDate: Date
		notes: String
		numOfApplicants: Int
		status: String		
	}
`

const vacancyQuery = `
	vacancy(id: ID): Vacancy
	vacancies(limit: Int): [Vacancy]
`

const vacancyMutation = `

`

module.exports = { vacancySchema, vacancyQuery, vacancyMutation }

