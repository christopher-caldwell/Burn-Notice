<template lang='pug'>
	v-text-field(
		outlined
		v-model="time"
		:label="label"
		hint='24 hour format: 1430'
		@blur="validateTime"
		v-mask="timeMask"
		:error-messages="errors"
	)
</template>

<script>
import { mask } from 'vue-the-mask'
export default {
	name: 'InlineTimePicker',
	directives: {
		mask
	},
	props: {
		label: {
			type: String,
			required: false,
			default: 'Time'
		},
		errorTrackingKey: {
			type: String,
			required: true
		}
	},
	data(){
		return {
			time: null,
			timeMask: '##:##',
			errors: []
		}
	},
	watch: {
		errors(){
			// emmits the key, and it there are errors. If there are no errors, it is consider "passing"
			this.$emit('errorUpdate', { [this.errorTrackingKey]: !!this.errors.length })
		}
	},
	methods: {
		validateTime(){
			// this.errors = []
			// const
			// if(this.time > 2400 || this.time < 0){
			// 	this.errors.push('Invalid Time')
			// }
			// const stringTime = this.time.toString()
			// const hours = stringTime.slice(0,2)
			// const minutes = stringTime.slice(2,4)
			// const areHoursValid = parseInt(hours) < 24
			// const areMinutesValid = parseInt(minutes) < 60
			// if(areHoursValid && areMinutesValid){
			// 	}
			this.$emit('timeUpdate', this.time)
		}
	}
}
</script>

<style>

</style>