<template lang='pug'>
	v-container
		v-row
			v-col
				h2 Vacancies
			v-col
				v-text-field(
					v-model="search"
					append-icon="mdi-magnify"
					label="Search"
					single-line
					hide-details
				)
		v-row
			v-col
				v-data-table( @click:row="selectItem" :headers="vacancyHeaders" :items="vacancies" :search="search")
					template(v-slot:item.postDate="{ item }")
						div {{ formatDate(item.postDate) }}
					template(v-slot:item.fireStation="{ item }")
						div {{ item.fireStation.name }}
					template(v-slot:item.isEngine="{ item }")
						div {{ mapBoolToText(item.isEngine) }}
					template(v-slot:item.isTemporary="{ item }")
						div {{ mapBoolToText(item.isTemporary) }}
					template(v-slot:item.status="{ item }")
						div {{ capitalize(item.status) }}
					

</template>

<script>
import { vacancyHeaders } from '@/data/constants'
import { vacancies } from '@/data/mockData'
import { formatDate, mapBoolToText, capitalize } from '@/utils/'
export default {
	name: 'FireStationTable',
	data(){
		return {
			search: null,
			vacancies,
			vacancyHeaders: Object.values(vacancyHeaders)
		}
	},
	methods: {
		formatDate,
		mapBoolToText,
		capitalize,
		selectItem(item){
			console.log('item', item)
		}
	}
}
</script>

<style>

</style>