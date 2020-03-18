<template lang='pug'>
	v-container
		v-row
			v-col
				h2 Fire Stations
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
					:query="require('@/graphql/district/Districts.gql')" 
					:notifyOnNetworkStatusChange="true"
				)
					template(v-slot="{ result: { loading, data } }")
						v-data-table( 
							@click:row="selectItem" 
							:headers="headers" 
							:loading="loading" 
							:items="districts" 
							:search="search"
						)
							template(v-slot:item.chief="{ item }")
								div {{ item.captain.firstName }} {{ item.captain.lastName }}
							

</template>

<script>
import { districtHeaders } from '@/data/constants'
import { formatDate, mapBoolToText, capitalize } from '@/utils/'
export default {
	name: 'DistrictTable',
	data(){
		return {
			search: null,
			districts: [],
			headers: Object.values(districtHeaders)
		}
	},
	methods: {
		formatDate,
		mapBoolToText,
		capitalize,
		selectItem(item){
			console.log('item', item)
		},
		mapDataToState({ data }){
			if(data.districts){
				this.districts = data.districts
			}
		}
	}
}
</script>

<style>

</style>