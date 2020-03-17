<template lang='pug'>
	v-container
		UnderlinedHeader(header='Chemicals')
		v-row.switch-spacer(justify='space-between' align='center')
			v-col Exposed to Chemicals?
			v-col(cols=4)
				v-switch.no-margin( 
					v-model="wasExposedToChem" 
					:color="greenColor" 
					hide-details 
					@change="emitUpdate('wasExposedToChem')"
				)
		v-row.switch-spacer(justify='space-between' align='center')
			v-col Exposed to Fire Retardant?
			v-col(cols=4)
				v-switch.no-margin( 
					v-model="wasFireRetardantPresent" 
					:color="greenColor" 
					hide-details
					@change="emitUpdate('wasFireRetardantPresent')"
				)
		UnderlinedHeader.category-spacer(header='Additional Notes')
		v-row
			v-col
				v-textarea(
					name="input-7-1"
					outlined
					label="More info about chemical exposure"
					auto-grow
					v-model="chemicalExposureNotes"
					rows='3'
					@blur="emitUpdate('chemicalExposureNotes')"
				)
</template>

<script>
import { greenColor } from '@/data/constants'
import UnderlinedHeader from '@/components/util/UnderlinedHeader.vue'
export default {
	name: 'ConditionsPage',
	components: {
		UnderlinedHeader
	},
	data(){
		return {
			wasExposedToChem: true,
			wasFireRetardantPresent: true,
			greenColor,
			chemicalExposureNotes: null
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