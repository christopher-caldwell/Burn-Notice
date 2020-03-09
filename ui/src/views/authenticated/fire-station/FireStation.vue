<template lang='pug'>
	v-container.station-container
		v-row(justify='center' align-items='center')
			v-col(cols=11)
				h1 {{ fireStation.name }}
				router-link(:to="`/user/district/${fireStation.district.id}`")
					h5 District {{ fireStation.district.name }}
				h5 Captain {{ captainsName }}
		v-row.openings-cont(justify='center')
			v-col
				ExpansionPanelList(title='Openings' v-model="isOpeningsOpen")
					template(slot='content')
						v-row
							v-col
								Vacancy(v-for="vacancy in fireStation.vacancies" :vacancy="vacancy" v-if="fireStation.vacancies.length")
								h5(v-else) No openings at this time
		v-row.openings-cont(justify='center')
		v-col
			ExpansionPanelList(title='Team Mambers' v-model="isTeamMembersOpen")
				template(slot='content')
					v-text-field(
						outlined 
						label='Member Name' 
						:color="lightBlueColor" 
						:disabled="isLoading"
						v-model="memberName"
					)
						template(v-slot:append)
							v-icon(v-if="!isLoading" @click="searchForTeamMember") mdi-magnify
							v-fade-transition(leave-absolute v-else)
								v-progress-circular(indeterminate size='20' :color="lightBlueColor")
</template>

<script>
import SideBySide from '@/components/util/SideBySide.vue'
import FireStationSkeleton from '@/components/skeleton-loaders/Station.vue'
import ExpansionPanelList from '@/components/util/ExpansionPanelList.vue'
import Vacancy from '@/components/vacancy/Vacancy.vue'
import { fireStation } from '@/data/mockData'
import { lightBlueColor } from '@/data/constants'

export default {
	name: 'FireStation',
	components: {
		SideBySide,
		Vacancy,
		ExpansionPanelList,
		FireStationSkeleton
	},
	data(){
		return {
			hasLoaded: false,
			isLoading: false,
			fireStation,
			lightBlueColor,
			isOpeningsOpen: 0,
			isTeamMembersOpen: 1,
			memberName: null
		}
	},
	computed: {
		captainsName(){
			return this.fireStation.captain.firstName + ' ' + this.fireStation.captain.lastName
		}
	},
	methods: {
		async searchForTeamMember(){
			this.isLoading = true
			await new Promise((res) => setTimeout(res, 2000))
			this.isLoading = false
		}
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