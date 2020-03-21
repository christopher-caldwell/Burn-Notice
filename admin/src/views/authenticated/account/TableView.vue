<template lang='pug'>
	Table(
		header='Accounts'
		:headers="accountHeaders"
		queryPath='account/Accounts.gql'
		keyOfQueryResult='accounts'
		@itemsUpdate="itemUpdate"
		:itemsToShow="items"
		:search="search"
	)
</template>

<script>
import Table from '@/components/table/Table.vue'
import { accountHeaders, roleEnum } from '@/data/constants'
import { formatDateTime, mapBoolToText } from '@/utils'
export default {
	name: 'AccountTable',
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
			accountHeaders,
			items: []
		}
	},
	methods: {
		itemUpdate(newItems){
			newItems.forEach(item => {
				item.accountRole = roleEnum[item.accountRole]
				item.lastLoggedInAt = formatDateTime(item.lastLoggedInAt)
				item.isEligibleForTransfer = mapBoolToText(item.isEligibleForTransfer)
			})
			this.items = newItems
		}
	},
	mounted(){
		console.log('this.search', this.search)
	}
}
</script>

<style lang='sass'>
</style>