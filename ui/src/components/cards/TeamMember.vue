<template lang='pug'>
	v-container.no-padding
		v-row(justify='space-between' align='center')
			v-col(cols=2 align='center')
				v-avatar(size="36")
					v-icon(dark) mdi-account-circle
			v-col(:cols="colsOfName").
				{{ member.firstName }} {{ member.lastName }}
			v-col(cols=3 v-if="hasAddButton")
				v-btn(text)
					v-icon(:color="greenColor") mdi-plus
				
</template>

<script>
import { greenColor } from '@/data/constants'
export default {
	name: 'TeamMember',
	props: {
		member: {
			type: Object,
			required: true
		},
		hasAddButton: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	data(){
		return {
			greenColor
		}
	},
	computed: {
		colsOfName(){
			return this.hasAddButton
				? 6
				: 10
		}
	}
}
</script>

<style>

</style>