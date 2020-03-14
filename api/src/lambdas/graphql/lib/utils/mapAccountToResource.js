module.exports = (resource, keyOfAccount) => {
	resource[keyOfAccount] = {
		id: resource[keyOfAccount],
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
