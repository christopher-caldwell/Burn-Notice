<template lang='pug'>
	v-container
		v-row
			v-col
				h2 Reports
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
				ApolloQuery(
					@result="mapDataToState"
					:query="require('@/graphql/report/Reports.gql')" 
					:notifyOnNetworkStatusChange="true"
				)
					template(v-slot="{ result: { loading, data } }")
						v-data-table( 
							@click:row="selectItem" 
							:headers="headers" 
							:loading="loading" 
							:items="reports" 
							:search="search"
						)
							template(v-slot:item.submitter="{ item }")
								div {{ item.submitter.firstName }} {{ item.submitter.lastName }}
							template(v-slot:item.fireStation="{ item }")
								div {{ item.fireStation.name }}
							template(v-slot:item.typeOfIncident="{ item }")
								div {{ capitalize(item.typeOfIncident) }}
							template(v-slot:item.createdAt="{ item }")
								div {{ formatDate(item.createdAt) }}
							template(v-slot:item.timeArrived="{ item }")
								div {{ formatDateTime(item.timeArrived) }}
							template(v-slot:item.timeDispatched="{ item }")
								div {{ formatDateTime(item.timeDispatched) }}
							template(v-slot:item.wasExposedToChem="{ item }")
								div {{ mapBoolToText(item.wasExposedToChem) }}
							template(v-slot:item.wasFireRetardantPresent="{ item }")
								div {{ mapBoolToText(item.wasFireRetardantPresent) }}
							

</template>

<script>
import { reportHeaders } from '@/data/constants'
import { formatDate, mapBoolToText, capitalize, formatDateTime } from '@/utils/'
export default {
	name: 'ReportTable',
	data(){
		return {
			search: null,
			reports: [],
			headers: Object.values(reportHeaders)
		}
	},
	methods: {
		formatDate,
		formatDateTime,
		mapBoolToText,
		capitalize,
		selectItem(item){
			console.log('item', item)
		},
		mapDataToState({ data }){
			if(data.reports){
				this.reports = data.reports
			}
		}
	}
}
</script>

<style>

</style>