export const vacancies = [
	{
		id: 1,
		postDate: '2020-03-04',
		numOfApplicants: 12,
		station: {
			id: 4,
			name: 'Bandera'
		}
	},
	{
		id: 2,
		postDate: '2020-03-04',
		numOfApplicants: 14,
		station: {
			id: 4,
			name: 'Stone Oak'
		}
	},
	{
		id: 3,
		postDate: '2020-03-04',
		numOfApplicants: 2,
		station: {
			id: 4,
			name: 'De Zevala'
		}
	},
	{
		id: 4,
		postDate: '2020-03-04',
		numOfApplicants: 122,
		station: {
			id: 4,
			name: 'Station 14'
		}
	},
]

export const vacancy = {
	id: 1,
	postDate: '2020-03-04',
	numOfApplicants: 12,
	status: 'active',
	station: {
		id: 4,
		name: 'Bandera'
	},
	district: {
		id: 1,
		name: '12'
	},
	notes: 'These are some notes.\nThese notes have formatting in them to simulate what people are actually typing.\n\nHopefully it works'
}

export const mockUpdate = {
	id: 1,
	timeStamp: '2020-03-04',
	name: 'Your request was denied',
	hasAction: true
}