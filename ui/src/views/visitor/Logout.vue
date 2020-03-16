<template lang='pug'>
	span
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'LogoutHandler',
	mounted(){
		this.endSession()
		this.$router.push('/')
	},
	methods: {
		...mapActions('session', ['endSession']),
	}
}
</script>

<style>

</style>