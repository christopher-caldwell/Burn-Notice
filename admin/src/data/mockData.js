export const vacancies = [
	{
		id: 1,
		postDate: '2020-03-04',
		numOfApplicants: 12,
		fireStation: {
			id: 4,
			name: 'Bandera'
		},
		isEngine: true,
		isTemporary: false,
		status: 'approved'
	},
	{
		id: 2,
		postDate: '2020-03-04',
		numOfApplicants: 14,
		fireStation: {
			id: 4,
			name: 'Stone Oak'
		},
		isEngine: false,
		isTemporary: false,
		status: 'approved'
	},
	{
		id: 3,
		postDate: '2020-03-04',
		numOfApplicants: 2,
		fireStation: {
			id: 4,
			name: 'De Zevala'
		},
		isEngine: true,
		isTemporary: true,
		status: 'approved'
	},
	{
		id: 4,
		postDate: '2020-03-04',
		numOfApplicants: 122,
		fireStation: {
			id: 4,
			name: 'Station 14'
		},
		isEngine: false,
		isTemporary: true,
		status: 'approved'
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

export const fireStation = {
	id: 1,
	name: 'Bandera',
	district: {
		name: '14',
	},
	captain: {
		id: 2,
		firstName: 'Willy',
		lastName: 'Nilly',
	},
	vacancies
}