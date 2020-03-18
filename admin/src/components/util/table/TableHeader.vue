<template lang='pug'>
	v-row(justify='space-between')
		v-col(cols=5)
			DropdownHeader(
				:currentHeader="currentHeader" 
				:availableOptions="availableHeaders" 
				@clickedHeader="handleClickedHeader"
			)
		v-col(cols=5)
			v-text-field(
				v-model="search"
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
			search: null,
			availableHeaders: Object.values(tableHeaders),
		}
	},
	computed: {
		currentHeader(){
			return this.$route.params.header
		}
	},
	methods: {
		handleClickedHeader({ text, value }){
			this.$router.push(`/user/table/${value}?header=${text}`)
		},
	}
}
</script>

<style lang='sass'>
</style>