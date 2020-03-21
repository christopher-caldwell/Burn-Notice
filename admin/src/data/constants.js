export const darkRed = '#510000'
export const lightRed = '#d00707'
export const blueColor = '#0505e8'
export const lightBlueColor = '#4d4dff'
export const greenColor = '#4CAF50'

export const statusColorEnum = {
	'active': 'green-color',
	'filled': 'lightest-red',
  'pending': 'yellow-color',
  'cancelled': 'lightest-red'
}

export const roleEnum = {
	'captain': 'Captain',
  'chief': 'Chief',
  'fire_fighter': 'Fireman'
}

export const tableHeaders = {
	'account': {
		text: 'Accounts',
		value: 'account'
	},
	'assignment': {
		text: 'Assignments',
		value: 'assignment'
	},
	'district': {
		text: 'Districts',
		value: 'district'
	},
	'fire-station': {
		text: 'Stations',
		value: 'fire-station'
	},
	'vacancy': {
		text: 'Vacancies',
		value: 'vacancy'
	},
	'transfer-request': {
		text: 'Transfer Requests',
		value: 'transfer-request'
	},
	'report': {
		text: 'Reports',
		value: 'report'
	},
}

export const accountHeaders = {
	'sap': {
		text: 'SAP',
		value: 'sap'
	},
	'firstName': {
		text: 'First Name',
		value: 'firstName'
	},
	'lastName': {
		text: 'Last Name',
		value: 'lastName'
	},
	'email': {
		text: 'Email',
		value: 'email'
	},
	'phone': {
		text: 'Phone',
		value: 'phone'
	},
	'accountRole': {
		text: 'Role',
		value: 'accountRole'
	},
	'isEligibleForTransfer': {
		text: 'Can Transfer',
		value: 'isEligibleForTransfer'
	},
	'lastLoggedInAt': {
		text: 'Last Login',
		value: 'lastLoggedInAt'
	},
}

export const transferRequestHeaders = {
	'fireStation': {
		text: 'Fire Station',
		value: 'fireStation'
	},
	'submitter': {
		text: 'Submitter',
		value: 'submitter'
	},
	'applicationStatus': {
		text: 'Application Status',
		value: 'applicationStatus'
	},
	'sentDate': {
		text: 'Sent Date',
		value: 'sentDate'
	},
	'approvalDate': {
		text: 'Approval Date',
		value: 'approvalDate'
	},
}

export const fireStationHeaders = {
	'name': {
		text: 'Name',
		value: 'name'
	},
	'district': {
		text: 'District',
		value: 'district'
	},
	'captain': {
		text: 'Captain',
		value: 'captain'
	},
}

export const districtHeaders = {
	'name': {
		text: 'Name',
		value: 'name'
	},
	'chief': {
		text: 'Chief',
		value: 'chief'
	},
}

export const reportHeaders = {	
	'submitter': {
		text: 'Submitter',
		value: 'submitter'
	},
	'fireStation': {
		text: 'Station',
		value: 'fireStation'
	},
	'typeOfIncident': {
		text: 'Type of Incident',
		value: 'typeOfIncident'
	},
	'createdAt': {
		text: 'Submitted',
		value: 'createdAt'
	},
	'timeDispatched': {
		text: 'Time Dispatched',
		value: 'timeDispatched'
	},
	'timeArrived': {
		text: 'Time Arrived',
		value: 'timeArrived'
	},
	'wasExposedToChem': {
		text: 'Exposed to Chemicals',
		value: 'wasExposedToChem'
	},
	'wasFireRetardantPresent': {
		text: 'Fire Retardant',
		value: 'wasFireRetardantPresent'
	},
}

export const vacancyHeaders = {
	'fireStation': {
		text: 'Fire Station',
		value: 'fireStation'
	},
	'isEngine': {
		text: 'Engine',
		value: 'isEngine'
	},
	'isTemporary': {
		text: 'Temporary',
		value: 'isTemporary'
	},
	'status': {
		text: 'Status',
		value: 'status'
	},
	'postDate': {
		text: 'Post Date',
		value: 'postDate'
	},
	'fillDate': {
		text: 'Fill Date',
		value: 'fillDate'
	},
	'numOfApplicants': {
		text: '# of Applicants',
		value: 'numOfApplicants'
	},
}