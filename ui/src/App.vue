<template lang="pug">
  v-app
    Header
    v-content
      router-view(v-if="isReadyToShow")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Header from '@/components/header/Header.vue'

export default {
  components: {
    Header
	},
	computed: {
		...mapGetters('session', ['isReadyToShow'])
	},
	methods: {
		...mapActions('session', ['restoreSessionFromLocalStorage'])
	},
	created(){
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`)
	},
	async mounted(){
		await this.restoreSessionFromLocalStorage()
	}
}
</script>

<style lang='sass'>
  @import '@/styles/main.sass'
</style>
