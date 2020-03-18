<template lang='pug'>
	Table(
		header='Transfer Requests'
		:headers="transferRequestHeaders"
		queryPath='transfer-request/TransferRequests.gql'
		keyOfQueryResult='transferRequests'
		@itemsUpdate="itemUpdate"
		:itemsToShow="items"
	)
</template>

<script>
import Table from '@/components/util/Table'
import { transferRequestHeaders } from '@/data/constants'
import { capitalize, formatDate } from '@/utils'
export default {
	name: 'TransferTable',
	components: {
		Table
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
				item.fireStation = item.vacancy.fireStation.name
				item.submitter = item.requestSubmitter.firstName + ' ' + item.requestSubmitter.lastName
				item.sentDate = formatDate(item.sentDate )
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