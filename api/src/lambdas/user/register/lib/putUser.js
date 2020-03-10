const { putItem } = require('simple-lambda-actions/dist/dynamo/')

const TableName = process.env.TABLE_NAME
const partitionKey = process.env.TABLE_PARTITION_KEY
const rangeKey = process.env.TABLE_RANGE_KEY

const role = 'full-user'

const constructWriteParams = (sap, hashedPassword, userInformation) => {
	const params = {
		[partitionKey]: sap,
		[rangeKey]: 'user',
		password: hashedPassword,
		role,
		...userInformation
	}
	return params
}

const writeUser = async (sap, hashedPassword, userInformation) => {
	const writeParams = constructWriteParams(sap, hashedPassword, userInformation)
	await putItem(TableName, writeParams)
	return writeParams
}

module.exports = writeUser