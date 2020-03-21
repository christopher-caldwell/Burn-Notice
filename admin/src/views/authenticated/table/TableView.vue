<template lang='pug'>
	v-container
		TableHeader(@searchUpdate="updateSearch")
		router-view(:search="search")
</template>

<script>
import TableHeader from '@/components/table/TableHeader.vue'
export default {
	name: 'TableView',
	components: {
		TableHeader
	},
	data(){
		return {
			search: ''
		}
	},
	methods: {
		updateSearch(newTerm){
			this.search = newTerm
		}
	}
}
</script>

<style>

</style>