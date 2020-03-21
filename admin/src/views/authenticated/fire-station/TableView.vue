<template lang='pug'>
	Table(
		header='Fire Stations'
		:headers="fireStationHeaders"
		queryPath='fire-station/FireStations.gql'
		keyOfQueryResult='fireStations'
		@itemsUpdate="itemUpdate"
		:itemsToShow="items"
		:search="search"
	)
</template>

<script>
import Table from '@/components/table/Table.vue'
import { fireStationHeaders } from '@/data/constants'

export default {
	name: 'FireStationTable',
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
			fireStationHeaders,
			items: []
		}
	},
	methods: {
		itemUpdate(newItems){
			newItems.forEach(item => {
				item.district = item.district.name
				item.captain = item.captain.firstName + ' ' + item.captain.lastName
			})
			this.items = newItems
		}
	}
}
</script>

<style lang='sass'>
</style>