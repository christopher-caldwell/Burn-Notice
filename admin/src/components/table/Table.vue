<template lang='pug'>
	ApolloQuery(
		@result="mapDataToState"
		:query="require(`@/graphql/${queryPath}`)"
		:notifyOnNetworkStatusChange="true"
	)
		template(v-slot="{ result: { loading, data }, query }")
			v-row.no-padding
				v-col.no-padding.extra-space-bottom
					v-btn(text @click="query.refetch()") Refresh
						v-icon(medium) mdi-refresh
			v-row.no-padding
				v-col.no-padding
					v-data-table(
						@click:row="selectItem"
						:headers="tableHeaders"
						:loading="loading"
						:items="itemsToShow"
						:search="search"
					)
						template(v-slot:item.fireStation="{ item }")
							div {{ item.fireStation.name }}

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
		search: {
			type: String,
			required: false,
			default: ''
		}
	},
	data(vm){
		return {
			items: [],
			tableHeaders: Object.values(vm.headers),
		}
	},
	methods: {
		selectItem({ id }){
			const category = this.$route.query.header
			const routeToGoTo = `/user/${category}/${id}`
			this.$router.push(routeToGoTo)
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

<style lang='sass' scoped>
.extra-space-bottom
	margin-bottom: 1%
</style>