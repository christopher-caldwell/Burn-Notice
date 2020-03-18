<template lang='pug'>
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
export default {
	name: 'Table',
	props: {
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
		}
	},
	methods: {
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
