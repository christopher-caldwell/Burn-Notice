<template lang='pug'>
	v-container
		form(v-on:submit.prevent="attemptLogin")
			v-row
				v-col(align='center')
					h1.lightest-red.login-header Login
			v-row.login-cont(justify='center')
				v-col(cols='10' align='center')
					v-text-field(
						outlined 
						label='SAP' 
						:color="lightRed" 
						:disabled="isLoading"
						v-model="sap"
						type='tel'
					)
				v-col(cols='10' align='center')
					v-text-field(
						outlined 
						label='Password' 
						:color="lightRed" 
						:disabled="isLoading"
						v-model="password"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPassword ? 'text' : 'password'"
						@click:append="showPassword = !showPassword"
					)
			v-row
				v-col(align='center')
					router-link(to='/forgot-password') Forgot your password?
			v-row
				v-col(align='center')
					v-btn(:color="blueColor" :loading="isLoading" @click.prevent="attemptLogin") Login
		
</template>

<script>
import { lightRed, blueColor } from '@/data/constants'
import LineThroughText from '@/components/util/LineThroughText.vue'
import { mapActions } from 'vuex'

export default {
	name: 'Login',
	components: {
		LineThroughText,
	},
	data(){
		return {
			lightRed,
			blueColor,
			isLoading: false,
			sap: null,
			password: null,				
			showPassword: false,
		}
	},
	methods: {
		...mapActions('user', ['login']),
		async attemptLogin(){
			this.isLoading = true
			const payload = {
				sap: this.sap,
				password: this.password
			}
			try {
				await this.login(payload)
				this.$router.push('/user/home')
			} catch(error){
				console.log('error', error)
				this.isLoading = false
			}
		}
	}
}
</script>

<style lang='sass' scoped>
@import '@/styles/variables'
a
	color: $red-4

.login-cont
	margin-top: 10%
.login-header
	margin-top: 10%

</style>