<template lang='pug'>
	ApolloQuery(
		:query="require('@/graphql/transfer-request/TransferRequest.gql')"
		:variables="{ id: transferRequestId }"
		:notifyOnNetworkStatusChange="true"
		@result="mapDataToState"
	)
		template(v-slot="{ result: { loading, data } }")
			SkeletonLoader(v-if="loading")
			v-container(v-if="data")
				v-row
					v-col
						h1 Transfer Request
						v-divider.divider-spacer
				SideBySide( rowJustification='start' title='Applicant' useSlot )
					template(slot='content')
						router-link(:to="`/user/account/${data.transferRequest.requestSubmitter.id}`").
							{{ data.transferRequest.requestSubmitter.firstName }} {{ data.transferRequest.requestSubmitter.lastName }}
				SideBySide( rowJustification='start' title='Transfering To' useSlot )
					template(slot='content')
						router-link(:to="`/user/fire-station/${data.transferRequest.vacancy.fireStation.id}`").
							{{ data.transferRequest.vacancy.fireStation.name }}
				SideBySide(
					rowJustification='start'
					title='Application Date'
					:content="formatDate(data.transferRequest.sentDate)"
				)
				SideBySide(
					rowJustification='start'
					title='Number of Applicants'
					:content="data.transferRequest.vacancy.numOfApplicants"
				)
				SideBySide( rowJustification='start' title='Request Status' useSlot )
					template(slot='content')
						span {{ capitalize(data.transferRequest.applicationStatus) }}
				SideBySide( rowJustification='start' title='Vacancy Status' useSlot )
					template(slot='content')
						span(:class="determineVacancyStatusClass(data.transferRequest.vacancy.status)").
							{{ capitalize(data.transferRequest.vacancy.status) }}
				v-divider.action-divider
				ApolloMutation(
						:mutation="require('@/graphql/transfer-request/DecideTransferRequest.gql')" 
						:notifyOnNetworkStatusChange="true"
						@done="afterRequestHandler"
					).apply-button-cont
						template(v-slot="{ mutate, loading, error }")
							div.error--text(v-if="error") {{ error }}			
							v-row(justify='start')
								v-col(cols=2)
									v-btn( medium :color="lightRed" @click="makeDetermination(false, mutate)" :loading="loading") Deny
								v-col(cols=2)
									v-btn(medium :color="greenColor" @click="makeDetermination(true, mutate)" :loading="loading") Approve
									
									
				
</template>

<script>
import SideBySide from '@/components/util/SideBySide.vue'
import UnderlinedHeader from '@/components/util/UnderlinedHeader.vue'
import SkeletonLoader from '@/components/skeleton-loaders/Home.vue'
import { mapBoolToText, formatDateTime, formatDate, capitalize } from '@/utils/'
import { statusColorEnum, lightRed, greenColor } from '@/data/constants'
export default {
	name: 'TransferRequest',
	components: {
		SkeletonLoader,
		UnderlinedHeader,
		SideBySide
	},
	data(){
		return {
			lightRed,
			greenColor,
			transferRequest: {},
		}
	},
	computed: {
		transferRequestId(){
			return this.$route.params.id
		}
	},
	methods: {
		mapBoolToText,
		formatDateTime,
		formatDate,
		capitalize,
		determineVacancyStatusClass(status){
			return statusColorEnum[status]
		},
		makeDetermination(didApproveRequest, mutationCallback){
			const requestParams = {
				requestSubmitterId: this.transferRequest.requestSubmitter.id,
				targetStation: this.transferRequest.vacancy.fireStation.id,
				vacancyId: this.transferRequest.vacancy.id,
				requestId: this.transferRequestId,
				approvingAuthId: this.$store.state.user.id,
				isNewStationEngine: this.transferRequest.vacancy.isEngine,
				didApproveRequest
			}
			mutationCallback({variables: { params: requestParams }})
		},
		mapDataToState({ data }){
			if(data && data.transferRequest){
				this.transferRequest = data.transferRequest
			}
		},
		afterRequestHandler(){
			this.$router.push('/user/table/transfer-request?header=transfer-request')
		}
	}
}
</script>

<style lang='sass' scoped>
.action-divider
	margin: 3% 0 
</style>