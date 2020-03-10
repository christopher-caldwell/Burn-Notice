const { queryItem } = require('simple-lambda-actions/dist/dynamo/')

const TableName = process.env.TABLE_NAME
const partitionKeyName = process.env.TABLE_PARTITION_KEY
const rangeKeyName = process.env.TABLE_RANGE_KEY


module.exports = (partitionKeySearchTerm, rangeKeySearchTerm) => {
	const updateParams = {
		TableName,
		partitionKeyName,
		// if a search term is provided, use it. If not, pass null so the lib wont use range
		rangeKeyName: rangeKeySearchTerm ? rangeKeyName : null, 
		partitionKeySearchTerm, 
		rangeKeySearchTerm, 
		rangeKeyComparisonOperator: 'begins_with'
	}
	return queryItem(updateParams, true)
}