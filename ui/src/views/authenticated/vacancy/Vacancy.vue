<template lang='pug'>
	v-container
		v-row
			v-col(align='center')
				h1.lightest-red.login-header {{ vacancy.station.name }}
		v-row.login-cont(justify='center')
			v-col(cols='10' align='center')
				SideBySide(
					title='Engine?' content='Yes' rowJustification='space-between' 
					contentClass='blue-color' titleCols=3
				) 
				SideBySide(title='Posted:' :content="formattedDate" rowJustification='space-between' contentClass='blue-color') 
					
</template>

<script>
import { mapActions } from 'vuex'
import SideBySide from '@/components/util/SideBySide.vue'
import { lightRed, blueColor } from '@/data/constants'
import { vacancy } from '@/data/mockData'
import { format } from 'date-fns'

export default {
	name: 'Vacancy',
	components: {
		SideBySide
	},
	data(){
		return {
			lightRed,
			blueColor,
			vacancy
		}
	},computed: {
		formattedDate(){
			const dateToFormat = new Date(this.vacancy.postDate)
			return format(dateToFormat, 'MMMM do, yyyy')
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