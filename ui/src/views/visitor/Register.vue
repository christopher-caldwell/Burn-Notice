<template lang='pug'>
	v-container
		v-row(align='center')
			v-col(align='center')
				h1 Register
			v-col(align='center')
		v-row(justify='center')
			v-col(cols='10' align='center')
				v-text-field(outlined label='SAP' v-model="sap" :color="lightBlueColor" :disabled="isLoading" required)
			v-col(cols='10' align='center')
				v-text-field(
						outlined
						:color="lightBlueColor"
						v-model="password"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPassword ? 'text' : 'password'"
						label="Password"
						:disabled="isLoading"
						counter
						@click:append="showPassword = !showPassword"
				)
			v-col(cols='10' align='center')
				v-text-field(outlined label='First Name' :color="lightBlueColor" :disabled="isLoading" v-model="firstName")
			v-col(cols='10' align='center')
				v-text-field(outlined label='Last Name' :color="lightBlueColor" :disabled="isLoading" v-model="lastName")
			v-col(cols='10' align='center')
				v-text-field(outlined label='Email' :color="lightBlueColor" :disabled="isLoading" v-model="email")
			v-col(cols='10' align='center')
				v-text-field(outlined label='Phone' :color="lightBlueColor" :disabled="isLoading" v-model="phone")
		v-row
			v-col(align='center')
				v-btn(:color="lightBlueColor" :loading="isLoading" @click="beginSignUp") Sign Up
		
</template>

<script>
import { lightRed, lightBlueColor } from '@/data/constants'
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
			lightBlueColor,
			lightRed,
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