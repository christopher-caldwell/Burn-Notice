<template lang='pug'>
	v-container
		UnderlinedHeader(header='Type of Incident')
		v-row
			v-col
				v-autocomplete(
					outlined
					v-model="typeOfIncident"
					:items="incidentTypes"
					@change="emitUpdate('typeOfIncident')"
				)
		UnderlinedHeader(header='Time Dispatched')
		v-row
			v-col
				InlineDatePicker(@dateUpdate="newDate => emitUpdate('dateDispatched', newDate)")
			v-col
				InlineTimePicker(@timeUpdate="newTime => emitUpdate('timeDispatched', newTime)" errorTrackingKey="timeDispatched")
		UnderlinedHeader(header='Time Arrived')
		v-row
			v-col
				InlineDatePicker(@dateUpdate="newDate => emitUpdate('dateArrived', newDate)")
			v-col
				InlineTimePicker(@timeUpdate="newTime => emitUpdate('timeArrived', newTime)" errorTrackingKey="timeDispatched")
</template>

<script>
import { mask } from 'vue-the-mask'
import { incidentTypes } from '@/data/constants'
import InlineDatePicker from '@/components/util/InlineDatePicker.vue'
import InlineTimePicker from '@/components/util/InlineTimePicker.vue'
import UnderlinedHeader from '@/components/util/UnderlinedHeader.vue'
export default {
	name: 'TimePage',
	directives: {
		mask
	},
	components: {
		InlineDatePicker,
		InlineTimePicker,
		UnderlinedHeader
	},
	data(){
		return {
			incidentTypes: Object.values(incidentTypes),
			typeOfIncident: null,
			dateDispatched: null,
			timeDispatched: null,
			dateArrived: null,
			timeArrived: null,
		}
	},
	methods: {
		emitUpdate(keyOfUpdate, payload){
			// if a payload is given, send that. If not, send the data prop of the key name
			const emitPayload = payload 
				? { key: keyOfUpdate, value: payload }
				: { key: keyOfUpdate, value: this[keyOfUpdate] }
			console.log('emitPayload', emitPayload)
			this.$emit('fieldUpdate', emitPayload)
		}
	}
}
</script>

<style>

</style>