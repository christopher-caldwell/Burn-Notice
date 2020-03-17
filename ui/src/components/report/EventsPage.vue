<template lang='pug'>
	v-container
		UnderlinedHeader(header='Team One Actions')
		v-row.switch-spacer(justify='space-between' align='center')
			v-col
				v-textarea(
					name="input-7-1"
					outlined
					label="Description of the primary team's role"
					auto-grow
					v-model="actionsOfPrimaryTeam"
					rows='3'
					@blur="emitUpdate('actionsOfPrimaryTeam')"
				)
		UnderlinedHeader.category-spacer(header='Team Two Actions')
		v-row
			v-col
				v-textarea(
					name="input-7-1"
					outlined
					label="Description of the secondary team's role"
					auto-grow
					v-model="actionsOfSecondaryTeam"
					rows='3'
					@blur="emitUpdate('actionsOfSecondaryTeam')"
				)
		UnderlinedHeader.category-spacer(header='General Description of the Event')
		v-row
			v-col
				v-textarea(
					name="input-7-1"
					outlined
					label="Overall summary"
					auto-grow
					v-model="descriptionOfEvent"
					rows='3'
					@blur="emitUpdate('descriptionOfEvent')"
				)
</template>

<script>
import { greenColor } from '@/data/constants'
import UnderlinedHeader from '@/components/util/UnderlinedHeader.vue'
export default {
	name: 'EventsPage',
	components: {
		UnderlinedHeader
	},
	data(){
		return {
			actionsOfPrimaryTeam: null,
			actionsOfSecondaryTeam: null,
			descriptionOfEvent: null,
			greenColor,
			
		}
	},
	methods: {
		emitUpdate(keyOfUpdate){
			const emitPayload = { key: keyOfUpdate, value: this[keyOfUpdate] }
			console.log('emit payload ', emitPayload)
			this.$emit('fieldUpdate', emitPayload)
		}
	}
}
</script>

<style lang='sass' scoped>
	.category-spacer
		margin-top: 10%
	.switch-spacer
		margin-bottom: 4% !important
</style>