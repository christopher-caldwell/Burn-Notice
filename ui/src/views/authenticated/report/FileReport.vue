<template lang='pug'>
	v-container
		v-row
			v-col
				h1 File Report
				v-divider.divider-spacer
		v-row
			v-col
				v-tabs( center-active v-model="activeTab")
					v-tab Times
					v-tab Conditions
					v-tab Team
					v-tab Events
					v-tab Review
				v-tabs-items(v-model="activeTab") 
					v-tab-item
						TimePage(@fieldUpdate="updateField")
					v-tab-item
						ConditionsPage(@fieldUpdate="updateField")
					v-tab-item
						TeamPage(@fieldUpdate="updateField")
					v-tab-item
						EventsPage(@fieldUpdate="updateField")
					v-tab-item
						ReviewPage(:reportInformation="allData")
						ApolloMutation(
							:mutation="require('@/graphql/report/CreateReport.gql')" 
							:notifyOnNetworkStatusChange="true"
							@done="afterRequestHandler"
						).apply-button-cont
							template(v-slot="{ mutate, loading, error }")
								div.error--text(v-if="error") {{ error }}
								FullWidthButton(
									:isLoading="loading"
									:disabled="loading"
									text="Submit"
									@buttonClicked="readyMutation(mutate)"
								)
			
</template>

<script>
import FullWidthButton from '@/components/util/FullWidthButton.vue'
import TimePage from '@/components/report/TimePage.vue'
import ConditionsPage from '@/components/report/ConditionsPage.vue'
import TeamPage from '@/components/report/TeamPage.vue'
import EventsPage from '@/components/report/EventsPage.vue'
import ReviewPage from '@/components/report/ReviewPage.vue'
import { formatDate } from '@/utils/'
export default {
	name: 'FileReport',
	components: {
		TimePage,
		ConditionsPage,
		TeamPage,
		EventsPage,
		ReviewPage,
		FullWidthButton
	},
	data(){
		return {
			activeTab: null,
			typeOfIncident: null,
			fireStation: null,
			dateDispatched: formatDate(new Date().toDateString()),
			dateArrived: formatDate(new Date().toDateString()),
			timeDispatched: null,
			timeArrived: null,
			wasExposedToChem: true,
			wasFireRetardantPresent: true,
			chemicalExposureNotes: null,
			actionsOfPrimaryTeam: null,
			actionsOfSecondaryTeam: null,
			descriptionOfEvent: null,
			teamOne: [],
			teamTwo: [],
			mutationParams: {}
		}
	},
	computed: {
		allData(){
			const data = {...this.$data}
			delete data['$apolloData']
			delete data['activeTab']
			return data
		}
	},
	methods: {
		updateField({ value, key }){
			this[key] = value
		},
		afterRequestHandler(){
			this.$router.push('/user/report')
		},
		readyMutation(mutationCallback){
			const validTimeDispatched = new Date(this.dateDispatched + ' ' + this.timeDispatched)
			const validTimeArrived = new Date(this.dateArrived + ' ' + this.timeArrived)
			const mutationParams = {
				submitter: this.$store.state.user.id,
				fireStation: parseInt(this.fireStation),
				timeDispatched: validTimeDispatched,
				timeArrived: validTimeArrived,
				typeOfIncident: this.typeOfIncident,
				wasExposedToChem: this.wasExposedToChem,
				wasFireRetardantPresent: this.wasFireRetardantPresent,
				chemicalExposureNotes: this.chemicalExposureNotes,
				actionsOfPrimaryTeam: this.actionsOfPrimaryTeam,
				actionsOfSecondaryTeam: this.actionsOfSecondaryTeam,
				descriptionOfEvent: this.descriptionOfEvent,
			}
			mutationCallback({ variables: { params: mutationParams } })
		}
	}
}
</script>

<style lang='sass'>
.v-tabs-items
	background-color: transparent !important
</style>