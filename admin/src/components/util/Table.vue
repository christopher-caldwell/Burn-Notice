<template lang='pug'>
	v-container
		v-row
			v-col
				h2 {{ header }}
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
					:query="require(queryPath)" 
					:notifyOnNetworkStatusChange="true"
				)
					template(v-slot="{ result: { loading, data } }")
						v-data-table( 
							@click:row="selectItem" 
							:headers="headers" 
							:loading="loading" 
							:items="items" 
							:search="search"
						)
							slot(name='table-variations')
							

</template>

<script>
export default {
	name: 'Table',
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
	},
	data(vm){
		return {
			search: null,
			items: [],
			headers: Object.values(vm.headers)
		}
	},
	methods: {
		selectItem(item){
			console.log('item', item)
		},
		mapDataToState({ data }){
			if(data[this.keyOfQueryResult]){
				this.items = data[keyOfQueryResult]
			}
		}
	}
}
</script>
