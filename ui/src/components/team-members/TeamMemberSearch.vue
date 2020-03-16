<template lang='pug'>
	v-row.openings-cont(justify='center')
		v-col
			ExpansionPanelList(title='Team Mambers' v-model="isTeamMembersOpen")
				template(slot='content')
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
							TeamMember(v-for="(member, index) in filteredAccounts" :member="member" :key="`member-${member.id}`" ) 
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
	created(){
		this.stationId = this.$route.params.id
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

<style>

</style>