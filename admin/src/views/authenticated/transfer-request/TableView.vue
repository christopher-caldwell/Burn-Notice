<template lang='pug'>
	Table(
		:headers="transferRequestHeaders"
		queryPath='transfer-request/TransferRequests.gql'
		keyOfQueryResult='transferRequests'
		@itemsUpdate="itemUpdate"
		:itemsToShow="items"
		:search="search"
	)
</template>

<script>
import Table from '@/components/table/Table'
import { transferRequestHeaders } from '@/data/constants'
import { capitalize, formatDate } from '@/utils'
export default {
	name: 'TransferTable',
	components: {
		Table
	},
	props: {
		search: {
			type: String,
			required: false
		}
	},
	data(){
		return {
			transferRequestHeaders,
			items: []
		}
	},
	methods: {
		itemUpdate(newItems){
			newItems.forEach(item => {
				const fillDate = item.approvalDate ? formatDate(item.approvalDate) : null
				item.fireStation = {
					id: item.vacancy.fireStation.id,
					name: item.vacancy.fireStation.name
				}
				item.submitter = item.requestSubmitter.firstName + ' ' + item.requestSubmitter.lastName
				item.sentDate = formatDate(item.sentDate )
				item.approvalDate = fillDate
				item.applicationStatus = capitalize(item.applicationStatus)
			})
			this.items = newItems
			console.log('newItems', newItems)
		}
	}
}
</script>

<style lang='sass'>
</style>