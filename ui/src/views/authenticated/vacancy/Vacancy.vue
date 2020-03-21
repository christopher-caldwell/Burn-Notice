<template lang='pug'>
	ApolloQuery(@result="mapDataToState" :query="require('@/graphql/vacancy/Vacancy.gql')" :variables="{ id: vacancyId }" :notifyOnNetworkStatusChange="true")
		template(v-slot="{ result: { loading, data } }")
			SkeletonLoader(v-if="loading")
			v-container(v-if="data")
				v-row(justify='center' align-items='center')
					v-col(cols=11)
						v-row
							v-col(cols=8)
								h1 {{ data.vacancy.fireStation.name }}
								h3(:class="formattedStatus.className") {{ formattedStatus.text }}
								h5(v-if="data.vacancy.fillDate") Filled on: {{ data.vacancy.fillDate }}
								h5 {{ formattedPostDate }}
								h5 District {{ data.vacancy.fireStation.district.name }}
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
					ApolloMutation(
						:mutation="require('@/graphql/transfer-request/createTransferRequest.gql')" 
						:notifyOnNetworkStatusChange="true"
						@done="afterRequestHandler"
						:variables="{ params: transferRequestParams }"
					).apply-button-cont
						template(v-slot="{ mutate, loading, error }")
							div.error--text(v-if="error") {{ error }}
							FullWidthButton(
								:isLoading="loading"
								:disabled="!isEligibleForTransfer || loading"
								:text="eligibleForTransferText"
								:customClass="isEligibleForTransfer ? '' : 'grey'"
								@buttonClicked="mutate()"
							)
</template>

<script>

import { format } from 'date-fns'
import FullWidthButton from '@/components/util/FullWidthButton.vue'
import SideBySide from '@/components/util/SideBySide.vue'
import SkeletonLoader from '@/components/skeleton-loaders/Vacancy.vue'
import { lightRed, blueColor, statusColorEnum } from '@/data/constants'
// import { vacancy } from '@/data/mockData'
import { capitalize, mapBoolToText } from '@/utils'
import { mapActions } from 'vuex'

export default {
	name: 'Vacancy',
	components: {
		SideBySide,
		SkeletonLoader,
		FullWidthButton
	},
	data(){
		return {
			lightRed,
			blueColor,
			vacancy: null,
			vacancyId: null
		}
	},
	computed: {
		isEligibleForTransfer(){
			return this.$store.state.user.isEligibleForTransfer
		},
		eligibleForTransferText(){
			return this.isEligibleForTransfer	
				? 'Apply'
				: 'You are not eligible'
		},
		formattedPostDate(){
			const parsedDate = new Date(this.vacancy.postDate)
			return format(parsedDate, 'MMMM do, yyyy')
		},
		formattedStatus(){
			return {
				text: capitalize(this.vacancy.status),
				className: statusColorEnum[this.vacancy.status]
			}
		},
		transferRequestParams(){
			const requestSubmitter = this.$store.state.user.id
			return {
				vacancy: this.vacancyId,
				requestSubmitter
			}
		}
	},
	created(){
		this.vacancyId = this.$route.params.id
	},
	methods: {
		...mapActions('user', ['updateEligibility']),
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
		afterRequestHandler(){
			this.updateEligibility()
			this.$router.push(`/user/vacancy/${this.vacancyId}/confirmation`)
		}
	}
}
</script>

<style lang='sass' scoped>

.login-cont
	margin-top: 10%
.notes-col
	white-space: pre-wrap
</style>