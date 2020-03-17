<template lang='pug'>
	v-container
		UnderlinedHeader(header='Type of Incident')
		v-row
			v-col
				v-autocomplete(
					outlined
					v-model="incidentType"
					:items="incidentTypes"	
				)
		UnderlinedHeader(header='Time Dispatched')
		v-row
			v-col
				InlineDatePicker
			v-col
				InlineTimePicker(errorTrackingKey="timeDispatched")
		UnderlinedHeader(header='Time Arrived')
		v-row
			v-col
				InlineDatePicker
			v-col
				InlineTimePicker(errorTrackingKey="timeDispatched")
</template>

<script>
import { incidentTypes } from '@/data/constants'
import InlineDatePicker from '@/components/util/InlineDatePicker.vue'
import InlineTimePicker from '@/components/util/InlineTimePicker.vue'
import UnderlinedHeader from '@/components/util/UnderlinedHeader.vue'
export default {
	name: 'TimePage',
	components: {
		InlineDatePicker,
		InlineTimePicker,
		UnderlinedHeader
	},
	data(){
		return {
			incidentTypes: Object.values(incidentTypes),
			incidentType: null,
		}
	}
}
</script>

<style>

</style>