<template lang='pug'>
	v-container
		v-row(justify='space-between')
			v-col(cols=5)
				DropdownHeader(:currentHeader="header" :availableOptions="availableHeaders" @clickedHeader="handleClickedHeader")
			v-col(cols=5)
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
					:query="require(`@/graphql/${queryPath}`)" 
					:notifyOnNetworkStatusChange="true"
				)
					template(v-slot="{ result: { loading, data } }")
						v-data-table( 
							@click:row="selectItem" 
							:headers="tableHeaders" 
							:loading="loading" 
							:items="itemsToShow" 
							:search="search"
						)
							slot(name='table-variations')
							

</template>

<script>
import DropdownHeader from './HeaderDropdown'
import { tableHeaders } from '@/data/constants'
export default {
	name: 'Table',
	components: {
		DropdownHeader
	},
	props: {
		header: {
			type: String,
			required: true
		},
		headers: {
			type: Object,
			required: true
		},
		queryPath: {
			type: String,
			required: true
		},
		keyOfQueryResult: {
			type: String,
			required: true
		},
		itemsToShow: {
			type: Array,
			required: true
		},
	},
	data(vm){
		return {
			search: null,
			items: [],
			tableHeaders: Object.values(vm.headers),
			availableHeaders: Object.values(tableHeaders),
		}
	},
	methods: {
		handleClickedHeader({ value }){
			this.$router.push(`/user/table/${value}`)
		},
		selectItem(item){
			console.log('item', item)
		},
		mapDataToState({ data }){
			if(data && data[this.keyOfQueryResult]){
				this.$emit('itemsUpdate', data[this.keyOfQueryResult])
				this.items = data[this.keyOfQueryResult]
			}
		}
	}
}
</script>
