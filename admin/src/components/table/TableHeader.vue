<template lang='pug'>
	v-row(justify='space-between' align='center')
		v-col(cols=5)
			DropdownHeader(
				:currentHeader="currentHeader" 
				:availableOptions="availableHeaders" 
				@clickedHeader="handleClickedHeader"
			)
		v-col(cols=5)
			v-text-field(
				v-model="search"
				@input="updateSearch"
				append-icon="mdi-magnify"
				label="Search"
				single-line
				hide-details
		)
</template>

<script>
import DropdownHeader from './HeaderDropdown'
import { tableHeaders } from '@/data/constants'

export default {
	name: 'TableHeader',
	components: {
		DropdownHeader
	},
	data(){
		return {
			currentHeader: '',
			search: null,
			availableHeaders: Object.values(tableHeaders),
		}
	},
	methods: {
		handleClickedHeader({ value, text }){
			this.currentHeader = text
			this.$router.push(`/user/table/${value}?header=${value}`)
		},
		updateSearch(newTerm){
			this.$emit('searchUpdate', newTerm)
		}
	},
	mounted(){
		if(this.$route.query.header){
			this.currentHeader = tableHeaders[this.$route.query.header]['text']
		}
	}
}
</script>

<style lang='sass'>
</style>