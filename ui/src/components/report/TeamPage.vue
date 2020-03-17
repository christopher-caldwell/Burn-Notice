<template lang='pug'>
	v-container
		UnderlinedHeader(header='Fire Station')
		v-row.switch-spacer(justify='space-between' align='center')
			v-col
				FireStationSearch(@stationUpdate="updateStation")
		UnderlinedHeader(header='Team One')
		v-row.switch-spacer(justify='space-between' align='center')
			v-col(v-if="fireStation")
				TeamMemberSearch(:stationId="fireStation" hasAddButton @memberSelected="member => addMemberToTeam(member, 'teamOne')")
		UnderlinedHeader(header='Team Two')
		v-row.switch-spacer(justify='space-between' align='center')
			v-col(v-if="fireStation")
				TeamMemberSearch(:stationId="fireStation" hasAddButton @memberSelected="member => addMemberToTeam(member, 'teamTwo')")
</template>

<script>
import FireStationSearch from '@/components/search/FireStationSearch.vue'
import TeamMemberSearch from '@/components/team-members/TeamMemberSearch.vue'
import UnderlinedHeader from '@/components/util/UnderlinedHeader.vue'
import { greenColor } from '@/data/constants'
export default {
	name: 'TeamPage',
	components: {
		UnderlinedHeader,
		TeamMemberSearch,
		FireStationSearch
	},
	data(){
		return {
			exposedToChemicals: true,
			greenColor,
			chemicalNotes: null,
			fireStation: null,
			teamOne: {},
			teamTwo: {},
		}
	},
	methods: {
		updateStation(newStationId){
			this.fireStation = newStationId
		},
		addMemberToTeam(member, team){
			this[team][member.id] = member
		}
	}
}
</script>

<style lang='sass' scoped>
	.category-spacer
		margin-top: 10%
	.switch-spacer
		margin-bottom: 4% !important
</style>