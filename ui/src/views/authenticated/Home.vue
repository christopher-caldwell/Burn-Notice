<template lang='pug'>
	ApolloQuery(
		:query="require('@/graphql/feed/Feed.gql')"
		:variables="{ id: userId }"
		:notifyOnNetworkStatusChange="true"
		@result="mapDataToState"
	)
		template(v-slot="{ result: { loading, data }, query }")
			HomeSkeleton(v-if="loading")
			v-container(v-if="data")
				UnderlinedHeader(header='Updates')
				v-row
					v-col(align='start')
						Update(
							v-for="update in updates"
							:update="update"
							:key="`update-${update.id}`"
							@removeUpdate="removeUpdate"
						)
						span(v-if="!updates.length") All caught up.
				v-row
					v-col(align='start')
						h5.update-header Openings
						v-divider
				v-row
					v-col(align='center')
						Vacancy( 
							v-for="(vacancy, index) in vacancies" 
							:vacancy="vacancy" 
							:key="`vacancy-${vacancy.id}`"
						)
</template>

<script>
import UnderlinedHeader from '@/components/util/UnderlinedHeader.vue'
import Vacancy from '@/components/cards/Vacancy.vue'
import Update from '@/components/cards/Update.vue'
import HomeSkeleton from '@/components/skeleton-loaders/Home.vue'
// import { vacancies } from '@/data/mockData'
export default {
	name: 'UserHome',
	components: {
		Vacancy,
		Update,
		HomeSkeleton,
		UnderlinedHeader
	},
	data(vm){
		return {
			userId: vm.$store.state.user.id,
			updates: {},
			vacancies: {},
		}
	},
	methods: {
		removeUpdate(updateId){
			this.updates = this.updates.filter(update => update.id !== updateId)
		},
		mapDataToState({ data }){
			if(data && data.homeFeed){
				this.vacancies = data.homeFeed.vacancies
				this.updates = data.homeFeed.updates
			}
		}
	}
}
</script>

<style lang='sass'>
.user-home-actions
	margin-top: 15%
.user-home-action
	margin-top: 5%
.update-header
	margin-bottom: 3%

</style>