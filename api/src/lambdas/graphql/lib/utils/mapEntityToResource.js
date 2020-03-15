exports.mapAccountToResource = resource => {
	resource['account'] = {
		id: resource['account'],
		firstName: resource.firstName, 
		lastName: resource.lastName, 
		sap: resource.sap, 
		email: resource.email, 
		phone: resource.phone, 
		createdAt: resource.createdAt, 
		lastLoggedInAt: resource.lastLoggedInAt,
		isEligibleForTransfer: resource.isEligibleForTransfer, 
		accountRole: resource.accountRole
	}
}

exports.mapAssignmentToResource = resource => {
	resource['assignment'] = {
		id: resource['assignment'],
		startDate: resource.startDate,
		endDate: resource.endDate,
		assignedStation: resource.assignedStation,
		account: resource.account,
	}
}

exports.mapDistrictToResource = resource => {
	resource['district'] = {
		id: resource['district'],
		chief: resource.chief,
		name: resource.name,
	}
}

exports.mapStationToResource = resource => {
	resource['fireStation'] = {
		id: resource['fireStation'],
		captain: resource.captain,
		district: resource.district,
		name: resource.name,
	}
}

exports.mapTransferRequestToResource = resource => {
	resource['transferRequest'] = {
		id: resource['transferRequest'],
		requestSubmitter: resource.requestSubmitter,
		applicationStatus: resource.applicationStatus,
		approvingAuthority: resource.approvingAuthority,
		sentDate: resource.sentDate,
		approvalDate: resource.approvalDate,
	}
}

exports.mapVacancyToResource = resource => {
	resource['vacancy'] = {
		id: resource['vacancy'],
		name: resource.name,
	}
}
