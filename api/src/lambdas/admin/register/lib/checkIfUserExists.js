const { getItem } = require('simple-lambda-actions/dist/dynamo/')
const CustomError = require('simple-lambda-actions/dist/util/ErrorHandler')

const TableName = process.env.TABLE_NAME
const partitionKey = process.env.TABLE_PARTITION_KEY
const rangeKey = process.env.TABLE_RANGE_KEY

const checkIfUserExists = async sap => {
	try{
		const prevStoredUser = await getItem(TableName, { [partitionKey]: sap, [rangeKey]: 'user' })
		if(prevStoredUser){
			throw new CustomError({
				message: 'User already exists',
				statusCode: 400
			})
		}
	} catch(error){
		if(error.statusCode === 404) return 
		throw error
	}
}

module.exports = checkIfUserExists