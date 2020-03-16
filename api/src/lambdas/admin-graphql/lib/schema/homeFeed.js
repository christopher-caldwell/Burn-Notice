const homeFeedSchema = `
	type AccountUpdate {
		id: ID!
		title: String
		tableNameOfUpdate: String
		idOfUpdateSource: ID
		isActionable: Boolean
		postDate: Date
	}
	type HomeFeed {
		updates: [AccountUpdate]
		vacancies: [Vacancy]
	}
`

const homeFeedQuery = `
	homeFeed(id: ID): HomeFeed
`

module.exports = { homeFeedSchema, homeFeedQuery }