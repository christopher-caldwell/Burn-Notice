<template lang='pug'>
	v-container
		UnderlinedHeader(header='Fire Station')
		v-row.switch-spacer(justify='space-between' align='center')
			v-col
				FireStationSearch(@stationUpdate="updateStation")
		UnderlinedHeader(header='Team One')
			template(slot='side-piece')
				v-col.extra-space-bottom(cols=4)
					v-btn(text small @click="showCurrentTeamMembers('teamOne')" )
						v-badge( :color="lightRed" :content="teamOneNotifications" :value="teamOneNotifications").
							See All #[v-icon mdi-chevron-right]
		v-row.switch-spacer(justify='space-between' align='center')
			v-col(v-if="fireStation")
				TeamMemberSearch(:stationId="fireStation" hasAddButton @memberSelected="member => addMemberToTeam(member, 'teamOne')")
		UnderlinedHeader(header='Team Two')
			template(slot='side-piece')
				v-col.extra-space-bottom(cols=4)
					v-btn(text small @click="showCurrentTeamMembers('teamTwo')" ).
						See All #[v-icon mdi-chevron-right]
		v-row.switch-spacer(justify='space-between' align='center')
			v-col(v-if="fireStation")
				TeamMemberSearch(:stationId="fireStation" hasAddButton @memberSelected="member => addMemberToTeam(member, 'teamTwo')")
		v-dialog( v-model="showTeamMemberDialog")
			v-card
				v-card-title(primary-title) {{ teamNameText }}
				TeamMember(v-for="(teamMember, index) in teamToShow" :member="teamMember" :key="`team-member-${index}`")
				v-card-subtitle.extra-space-top(v-if="!teamToShow.length") This team is currently empty
		v-snackbar(
			v-model="showSnackbar"
			:timeout="2500"
			:color="snackbarColor"
			top
		)
			v-row.no-padding(justify='space-between' align='center')
				v-col.no-padding(cols=5 align='center') {{ snackbarText }}
				v-col.no-padding(cols=4)
					v-btn(text @click="showSnackbar = false") Close
</template>


<script>
import FireStationSearch from '@/components/search/FireStationSearch.vue'
import TeamMemberSearch from '@/components/team-members/TeamMemberSearch.vue'
import TeamMember from '@/components/cards/TeamMember.vue'
import UnderlinedHeader from '@/components/util/UnderlinedHeader.vue'
import { greenColor, lightRed } from '@/data/constants'
export default {
	name: 'TeamPage',
	components: {
		UnderlinedHeader,
		TeamMemberSearch,
		TeamMember,
		FireStationSearch
	},
	data(){
		return {
			showSnackbar: false,
			snackbarColor: null,
			snackbarText: 'I is here',
			showTeamMemberDialog: false,
			exposedToChemicals: true,
			greenColor,
			lightRed,
			chemicalNotes: null,
			fireStation: null,
			teamNameText: null,
			teamToShow: [],
			teamOne: {},
			teamOneNotifications: 0,
			teamTwo: {},
			teamTwoNotifications: 0,
		}
	},
	methods: {
		updateStation(newStationId){
			this.fireStation = newStationId
			this.$emit('fieldUpdate', { value: newStationId, key: 'fireStation' })
		},
		addMemberToTeam(member, team){
			const oppositeTeam = team === 'teamOne'
				? 'teamTwo'
				: 'teamOne'
			if(!this[oppositeTeam][member.id]){
				// prevents duplicate notificiations
				if(!this[team][member.id]) {
					const notificationKey = `${team}Notifications`
					this[notificationKey]++
					this.$emit('fieldUpdate', { value: this.teamOne, key: team })
				}
				this[team][member.id] = member
			} else {
				this.showSnackbar = true
				this.snackbarColor = lightRed
				this.snackbarText = 'A member cannot be on both teams'
			}
		},
		showCurrentTeamMembers(teamName){
			const notificationKey = `${teamName}Notifications`
			this[notificationKey] = 0
			this.teamNameText = teamName === 'teamOne'
				? 'Team One'
				: 'Team Two'
			this.teamToShow = Object.values(this[teamName])
			this.showTeamMemberDialog = true
		}
	}
}
</script>

<style lang='sass' scoped>
	.category-spacer
		margin-top: 10%
	.switch-spacer
		margin-bottom: 4% !important
	.extra-space-top
		margin-top: 3%
</style>