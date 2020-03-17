<template lang='pug'>
	v-autocomplete(
		outlined
		v-model="station"
		:items="fireStations"
		item-text="name"
		item-value="id"
		@change="emitUpdate"
		placeholder='Choose a fire station'
	)
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'FireStationSearch',
	data(){
		return {
			station: null
		}
	},
	computed: {
		...mapGetters('fireStation', ['fireStations']),
	},
	methods: {
		emitUpdate(){
			this.$emit('stationUpdate', this.station)
		}
	}
}
</script>

<style lang='sass'>
</style>