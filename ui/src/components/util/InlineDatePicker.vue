<template lang='pug'>
	v-menu(
		v-model="menu"
		:close-on-content-click="false"
		transition="scale-transition"
		offset-y
		max-width="290px"
		min-width="290px"
	)
		template(v-slot:activator="{ on }")
			v-text-field(
				outlined
				v-model="formattedDate"
				label="Date"
				hint="MM/DD/YYYY format"
				@change="dateUpdate"
				v-on="on"
			)
		v-date-picker(v-model="date" no-title @change="dateUpdate")
</template>

<script>
import { formatDate } from '@/utils/'
export default {
	name: 'InlineDatePicker',
	data(){
		return {
			menu: false,
			modal: false,
			date: new Date().toISOString().substr(0, 10),
			formattedDate: formatDate(new Date().toDateString())
		}
	},
	methods: {
		formatDate,
		dateUpdate(){
			this.formattedDate = formatDate(this.date)
			this.$emit('dateUpdate', this.formattedDate)
		}
	}
}
</script>

<style>

</style>