<template lang='pug'>
	ApolloQuery(@result="data => mapDataToState(data, 'fireStation')" :query="require('@/graphql/station/Station.gql')" :variables="{ id: stationId }" :notifyOnNetworkStatusChange="true")
		template(v-slot="{ result: { loading, data } }")
			FireStationSkeleton(v-if="loading")
			v-container.station-container(v-if="data")
				v-row(justify='center' align-items='center')
					v-col(cols=11)
						h1 {{ data.fireStation.name }}
						router-link(:to="`/user/district/${data.fireStation.district.id}`")
							h5 {{ data.fireStation.district.name }}
						h5 Captain {{ data.fireStation.captain.lastName }}
				v-row.openings-cont(justify='center')
					v-col
						ExpansionPanelList(title='Openings' v-model="isOpeningsOpen")
							template(slot='content')
								v-row
									v-col
										Vacancy(v-for="vacancy in fireStation.vacancies" :vacancy="vacancy" v-if="fireStation.vacancies.length" :key="vacancy.id")
										h5(v-else) No openings at this time
				TeamMemberSearch(:stationId="stationId")
				
</template>

<script>
import TeamMemberSearch from '@/components/team-members/TeamMemberSearch.vue'
import FireStationSkeleton from '@/components/skeleton-loaders/Station.vue'
import SideBySide from '@/components/util/SideBySide.vue'
import ExpansionPanelList from '@/components/util/ExpansionPanelList.vue'
import Vacancy from '@/components/vacancy/StationView.vue'
// import { fireStation } from '@/data/mockData'
import { lightBlueColor } from '@/data/constants'
import { filterObjects } from '@/utils/'

export default {
	name: 'FireStation',
	components: {
		SideBySide,
		Vacancy,
		ExpansionPanelList,
		FireStationSkeleton,
		TeamMemberSearch
	},
	data(){
		return {
			hasLoaded: false,
			isLoading: false,
			lightBlueColor,
			isOpeningsOpen: 0,
			memberName: null,
			fireStation: null,
			stationId: null,
			accountsByStation: [],
			filteredAccounts: []
		}
	},
	created(){
		this.stationId = this.$route.params.id
	},
	computed: {
		captainsName(){
			return this.fireStation.captain.firstName + ' ' + this.fireStation.captain.lastName
		},
	},
	methods: {
		async searchForTeamMember(){
			this.isLoading = true
			this.filteredAccounts = await filterObjects([...this.accountsByStation], this.memberName)
			this.isLoading = false
		},
		mapDataToState({ data }, key){
			if(data && data[key]){
				this[key] = data[key]
			}
		},
	}
}
</script>

<style lang='sass' scoped>
@import '@/styles/variables'
a
	color: $blue-1

.login-cont
	margin-top: 10%
.openings-cont
	margin-top: 5%
.station-container
	padding-bottom: 20vh
</style>