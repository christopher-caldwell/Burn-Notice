<template lang='pug'>
	ApolloQuery(
		:query="require('@/graphql/feed/Feed.gql')"
		:variables="{ id: userId }"
		:notifyOnNetworkStatusChange="true"
	)
		template(v-slot="{ result: { loading, data }, query }")
			HomeSkeleton(v-if="loading")
			v-container(v-if="data")
				UnderlinedHeader(header='Updates')
				v-row
					v-col(align='start')
						Update(
							v-for="update in data.homeFeed.updates"
							:update="update"
							:key="`update-${update.id}`"
						)
						span(v-if="!data.homeFeed.updates.length") All caught up.
				v-row
					v-col(align='start')
						h5.update-header Openings
						v-divider
				v-row
					v-col(align='center')
						Vacancy( 
							v-for="(vacancy, index) in data.homeFeed.vacancies" 
							:vacancy="vacancy" 
							:key="`vacancy-${vacancy.id}`"
						)
</template>

<script>
import UnderlinedHeader from '@/components/util/UnderlinedHeader.vue'
import Vacancy from '@/components/cards/Vacancy.vue'
import Update from '@/components/cards/Update.vue'
import HomeSkeleton from '@/components/skeleton-loaders/Home.vue'
import { vacancies } from '@/data/mockData'
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
			vacancies,
			userId: vm.$store.state.user.id
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