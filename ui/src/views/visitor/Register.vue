<template lang='pug'>
	v-container
		v-row(align='center')
			v-col(align='center')
				h1.lightest-red Register
			v-col(align='center')
		v-row(justify='center')
			v-col(cols='10' align='center')
				v-text-field(outlined label='SAP' v-model="sap" :color="lightRed" :disabled="isLoading" required)
			v-col(cols='10' align='center')
				v-text-field(
						outlined
						:color="lightRed"
						v-model="password"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPassword ? 'text' : 'password'"
						label="Password"
						counter
						@click:append="showPassword = !showPassword"
				)
			v-col(cols='10' align='center')
				v-text-field(outlined label='First Name' :color="lightRed" :disabled="isLoading" v-model="firstName")
			v-col(cols='10' align='center')
				v-text-field(outlined label='Last Name' :color="lightRed" :disabled="isLoading" v-model="lastName")
			v-col(cols='10' align='center')
				v-text-field(outlined label='Email' :color="lightRed" :disabled="isLoading" v-model="email")
			v-col(cols='10' align='center')
				v-text-field(outlined label='Phone' :color="lightRed" :disabled="isLoading" v-model="phone")
		v-row
			v-col(align='center')
				v-btn(:color="lightRed" :loading="isLoading" @click="beginSignUp") Sign Up
		
</template>

<script>
import { lightRed, supportedLocales } from '@/data/constants'
import { mapActions } from 'vuex'
export default {
	name: 'Register',	
	data(){
		return {
			sap: null,
			password: null,
			firstName: null,
			lastName: null,
			station: null,
			phone: null,
			email: null,
			preferredLanguage: 'English',
			lightRed,
			supportedLocales: Object.values(supportedLocales),
			isLoading: false,
			showPassword: false,
		}
	},
	methods: {
		...mapActions('user', ['registerUser']),
		async beginSignUp(){
			this.isLoading = true
			const params = {
				sap: this.sap,
				password: this.password,
				firstName: this.firstName,
				lastName: this.lastName,
				phone: this.phone,
				email: this.email
			}
			
			try {
				await this.registerUser(params)
				this.$router.push('/user/home')
			} catch(error){
				console.error('error', error)
				this.isLoading = false
			}
		}
	}
}
</script>

<style lang='sass' scoped>
@import '@/styles/variables'
a
	color: $red-0
.oauth-row
	margin-top: 1%
.line-row
	margin: 4% 0
</style>