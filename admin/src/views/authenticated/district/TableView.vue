<template lang='pug'>
	Table(
		header='Districts'
		:headers="districtHeaders"
		queryPath='district/Districts.gql'
		keyOfQueryResult='districts'
		@itemsUpdate="itemUpdate"
		:itemsToShow="items"
		:search="search"
	)
</template>

<script>
import Table from '@/components/table/Table.vue'
import { districtHeaders } from '@/data/constants'
export default {
	name: 'DistrictTable',
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
			districtHeaders,
			items: []
		}
	},
	methods: {
		itemUpdate(newItems){
			newItems.forEach(item => {
				item.chief = item.chief.firstName + ' ' + item.chief.lastName
			})
			this.items = newItems
		}
	}
}
</script>

<style lang='sass'>
</style>