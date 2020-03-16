<template lang='pug'>
	ApolloQuery(:query="require('@/graphql/feed/Feed.gql')" :variables="{ id: 7 }" :notifyOnNetworkStatusChange="true")
		template(v-slot="{ result: { loading, data } }")
			HomeSkeleton(v-if="loading")
			v-container(v-if="data")
				v-row
					v-col(cols=9 align='start')
						h5.update-header Updates
				v-divider
					//- v-col(cols=3 align='start')
					//- 	h6.update-header.
					//- 		See all #[v-icon(small) mdi-chevron-right]
					//- v-divider
				v-row
					v-col(align='start')
						Update( v-for="update in data.homeFeed.updates" :update="update" :key="`update-${update.id}`")
				v-row
					v-col(align='start')
						h5.update-header Openings
						v-divider
				v-row
					v-col(align='center')
						Vacancy( v-for="(vacancy, index) in data.homeFeed.vacancies" :vacancy="vacancy" :key="`${index}-${vacancy.id}`")
</template>

<script>
import Vacancy from '@/components/cards/Vacancy.vue'
import Update from '@/components/cards/Update.vue'
import HomeSkeleton from '@/components/skeleton-loaders/Home.vue'
import { vacancies, mockUpdate } from '@/data/mockData'
export default {
	Name: 'UserHome',
	components: {
		Vacancy,
		Update,
		HomeSkeleton
	},
	data(){
		return {
			vacancies,
			mockUpdate
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