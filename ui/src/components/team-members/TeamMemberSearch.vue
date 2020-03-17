<template lang='pug'>	
	ApolloQuery(@result="data => mapDataToState(data, 'accountsByStation')" :query="require('@/graphql/account/AccountsByStation.gql')" :variables="{ stationId }" :notifyOnNetworkStatusChange="true")
		template(v-slot="{ result: { loading, data } }")
			form(@submit.prevent="searchForTeamMember")
				v-text-field(
					outlined 
					label='Member Name' 
					:color="lightBlueColor" 
					:disabled="isLoading || loading"
					:loading="loading"
					v-model="memberName"
				)
					template(v-slot:append)
						v-icon(v-if="!isLoading" type='submit' @click.prevent="searchForTeamMember") mdi-magnify
						v-fade-transition(leave-absolute v-else)
							v-progress-circular(indeterminate size='20' :color="lightBlueColor")
			div.team-member-results
				TeamMember(v-for="(member, index) in filteredAccounts" :member="member" :key="`member-${member.id}`" hasAddButton @memberSelected="emitSelected") 
</template>

<script>
import ExpansionPanelList from '@/components/util/ExpansionPanelList.vue'
import TeamMember from '@/components/cards/TeamMember'
import { lightBlueColor } from '@/data/constants'
import { filterObjects } from '@/utils/'
export default {
	name: 'TeamMemberSearch',
	components: {
		ExpansionPanelList,
		TeamMember
	},
	props: {
		stationId: {
			type: [Number, String],
			required: true
		},
		hasAddButton: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	data(){
		return {
			isLoading: false,
			accountsByStation: [],
			filteredAccounts: [],
			lightBlueColor,
			memberName: null,
			isTeamMembersOpen: 1,
		}
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
		emitSelected(member){
			console.log('member mid level', member)
			this.$emit('memberSelected', member)
		}
	}
}
</script>

<style lang='sass'>
	.team-member-results
		max-height: 50vh
		overflow: scroll
</style>