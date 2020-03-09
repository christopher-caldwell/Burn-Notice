<template lang='pug'>
	v-container
		v-row(justify='center' align-items='center')
			v-col(cols=10)
				v-row
					v-col(cols=8)
						h1 {{ vacancy.station.name }}
						h3(:class="formattedStatus.className") {{ formattedStatus.text }}
						h5(v-if="vacancy.fillDate") Filled on: {{ vacancy.fillDate }}
						h5 {{ formattedDate }}
						h5 District {{ vacancy.district.name }}
					v-col(cols=4)
				v-row.login-cont(justify='center')
					v-col
						h4 Details
						v-divider.divider-spacer
				v-row
					v-col
						SideBySide(
							title='Engine?' content='Yes' rowJustification='space-between' 
							titleCols=4 contentCols=8
						)
						SideBySide(
							title='Temporary?' content='Yes' rowJustification='space-between' 
							titleCols=4 contentCols=8
						)
						SideBySide(
							title='Applicants:' content='14' rowJustification='space-between' 
							titleCols=4 contentCols=8
						)
				v-row
					v-col
						h4 Notes
						v-divider.divider-spacer
				v-row
					v-col.notes-col {{ vacancy.notes }}

		div.apply-button-cont
			button.apply-button 
				h3 Apply
					
</template>

<script>
import { mapActions } from 'vuex'
import { format } from 'date-fns'
import SideBySide from '@/components/util/SideBySide.vue'
import { lightRed, blueColor, statusColorEnum } from '@/data/constants'
import { vacancy } from '@/data/mockData'
import { capitalize } from '@/utils'

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
		},
		formattedStatus(){
			return {
				text: capitalize(this.vacancy.status),
				className: statusColorEnum[this.vacancy.status]
			}
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
.apply-button-cont
	display: flex
	justify-content: center
	align-items: center
	position: fixed
	bottom: 10px
	width: 95%
	background-color: $blue-0
	border-radius: 10px
.apply-button
	padding: 7px
	width: 95%
	&:focus
		outline: none
	&:active
		transform: scale(0.95)
.notes-col
	white-space: pre-wrap
</style>