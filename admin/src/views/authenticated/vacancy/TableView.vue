<template lang='pug'>
	Table(
		header='Vacancies'
		:headers="vacancyHeaders"
		queryPath='vacancy/Vacancies.gql'
		keyOfQueryResult='vacancies'
		@itemsUpdate="itemUpdate"
		:itemsToShow="items"
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
	data(){
		return {
			vacancyHeaders,
			items: []
		}
	},
	methods: {
		itemUpdate(newItems){
			newItems.forEach(item => {
				item.postDate = formatDate(item.postDate)
				item.fireStation = item.fireStation.name
				item.isEngine = mapBoolToText(item.isEngine)
				item.isTemporary = mapBoolToText(item.isTemporary)
				item.postDate = formatDate(item.postDate )
				item.status = capitalize(item.status)
			})
			this.items = newItems
		}
	}
}
</script>

<style lang='sass'>
</style>