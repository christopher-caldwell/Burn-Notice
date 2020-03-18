<template lang='pug'>
	Table(
		:headers="reportHeaders"
		queryPath='report/Reports.gql'
		keyOfQueryResult='reports'
		@itemsUpdate="itemUpdate"
		:itemsToShow="items"
	)
</template>

<script>
import Table from '@/components/table/Table.vue'
import { reportHeaders } from '@/data/constants'
import { capitalize, formatDate, formatDateTime, mapBoolToText } from '@/utils' //, 
export default {
	name: 'ReportTable',
	components: {
		Table
	},
	data(){
		return {
			reportHeaders,
			items: []
		}
	},
	methods: {
		itemUpdate(newItems){
			newItems.forEach(item => {
				item.submitter = item.submitter.firstName + ' ' + item.submitter.lastName
				item.fireStation = item.fireStation.name
				item.createdAt = formatDate(item.createdAt)
				item.timeArrived = formatDateTime(item.timeArrived)
				item.timeDispatched = formatDateTime(item.timeDispatched)
				item.wasExposedToChem = mapBoolToText(item.wasExposedToChem)
				item.wasFireRetardantPresent = mapBoolToText(item.wasFireRetardantPresent)
				item.typeOfIncident = capitalize(item.typeOfIncident)
			})
			this.items = newItems
		}
	}
}
</script>

<style lang='sass'>
</style>