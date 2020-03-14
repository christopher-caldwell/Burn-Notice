<template lang='pug'>
	ApolloQuery(@result="mapDataToState" :query="require('@/graphql/Vacancy.gql')" :variables="{ id: vacancyId }" :notifyOnNetworkStatusChange="true")
		template(v-slot="{ result: { loading, data } }")
			SkeletonLoader(v-if="loading")
			v-container(v-if="data")
				v-row(justify='center' align-items='center')
					v-col(cols=10)
						v-row
							v-col(cols=8)
								h1 {{ data.vacancy.station.name }}
								h3(:class="formattedStatus.className") {{ formattedStatus.text }}
								h5(v-if="data.vacancy.fillDate") Filled on: {{ data.vacancy.fillDate }}
								h5 {{ formattedPostDate }}
								h5 District {{ data.vacancy.station.district.name }}
							v-col(cols=4)
						v-row.login-cont(justify='center')
							v-col
								h4 Details
								v-divider.divider-spacer
						v-row
							v-col
								SideBySide(
									title='Engine?' :content="mapBoolToText(data.vacancy.isEngine)" rowJustification='space-between' 
									titleCols=4 contentCols=8
								)
								SideBySide(
									title='Temporary?' :content="mapBoolToText(data.vacancy.isEngine)" rowJustification='space-between' 
									titleCols=4 contentCols=8
								)
								SideBySide(
									title='Applicants:' :content="data.vacancy.numOfApplicants" rowJustification='space-between' 
									titleCols=4 contentCols=8
								)
						v-row
							v-col
								h4 Notes
								v-divider.divider-spacer
						v-row
							v-col.notes-col(v-if="data.vacancy.notes") {{ data.vacancy.notes }}
							v-col.notes-col(v-else) N/A

				div.apply-button-cont
					button.apply-button 
						h3 Apply
							
</template>

<script>

import { format } from 'date-fns'
import SideBySide from '@/components/util/SideBySide.vue'
import SkeletonLoader from '@/components/skeleton-loaders/Vacancy.vue'
import { lightRed, blueColor, statusColorEnum } from '@/data/constants'
// import { vacancy } from '@/data/mockData'
import { capitalize, mapBoolToText } from '@/utils'

export default {
	name: 'Vacancy',
	components: {
		SideBySide,
		SkeletonLoader
	},
	data(){
		return {
			lightRed,
			blueColor,
			vacancy: null,
			vacancyId: null
		}
	},
	created(){
		this.vacancyId = this.$route.params.id
	},
	computed: {
		formattedPostDate(){
			const parsedDate = new Date(this.vacancy.postDate)
			return format(parsedDate, 'MMMM do, yyyy')
		},
		formattedStatus(){
			return {
				text: capitalize(this.vacancy.status),
				className: statusColorEnum[this.vacancy.status]
			}
		}
	},
	methods: {
		mapBoolToText,
		mapDataToState({ data }){
			if(data && data.vacancy){
				this.vacancy = data.vacancy
			}
		},
		formatDate(postDate){
			const parsedDate = new Date(postDate)
			return format(parsedDate, 'MMMM do, yyyy')
		},
		formatStatus(status){
			return {
				text: capitalize(status),
				className: statusColorEnum[status]
			}
		},
		
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