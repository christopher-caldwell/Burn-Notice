<template lang='pug'>
	Table(
		header='Vacancies'
		:headers="vacancyHeaders"
		queryPath='vacancy/Vacancies.gql'
		keyOfQueryResult='vacancies'
		@itemsUpdate="itemUpdate"
		:itemsToShow="items"
		:search="search"
	)
</template>

<script>
import Table from '@/components/table/Table.vue'
import { vacancyHeaders } from '@/data/constants'
import { capitalize, formatDate, mapBoolToText } from '@/utils'
export default {
	name: 'VacancyTable',
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
			vacancyHeaders,
			items: []
		}
	},
	methods: {
		itemUpdate(newItems){
			newItems.forEach(item => {
				console.log('item', item)
				const fillDate = item.fillDate ? formatDate(item.fillDate) : null
				item.postDate = formatDate(item.postDate)
				// item.fireStation = item.fireStation.name
				item.isEngine = mapBoolToText(item.isEngine)
				item.isTemporary = mapBoolToText(item.isTemporary)
				item.postDate = formatDate(item.postDate)
				item.fillDate = fillDate
				item.status = capitalize(item.status)
			})
			this.items = newItems
		}
	}
}
</script>

<style lang='sass'>
</style>