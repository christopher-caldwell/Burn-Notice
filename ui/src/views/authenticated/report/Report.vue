<template lang='pug'>
	ApolloQuery(:query="require('@/graphql/feed/Feed.gql')" :variables="{ id: 7 }" :notifyOnNetworkStatusChange="true")
		template(v-slot="{ result: { loading, data } }")
			HomeSkeleton(v-if="loading")
			v-container(v-if="data")
				v-row
					v-col(align='start')
						h1.update-header Reports
						v-divider
				v-row
					v-col(align='center')
						Vacancy( v-for="(vacancy, index) in data.homeFeed.vacancies" :vacancy="vacancy" :key="`${index}-${vacancy.id}`")
				v-row
					v-col(align='start')
						router-link(to='/user/report/file')
							div.apply-button-cont
								button.apply-button
									h3 File Report
</template>

<script>
import Vacancy from '@/components/cards/Vacancy.vue'
import Update from '@/components/cards/Update.vue'
import HomeSkeleton from '@/components/skeleton-loaders/Home.vue'
import { vacancies, mockUpdate } from '@/data/mockData'
export default {
	Name: 'ReportHome',
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

<style lang='sass' scoped>
a
	color: white
.user-home-actions
	margin-top: 15%
.user-home-action
	margin-top: 5%
.update-header
	margin-bottom: 3%
.login-cont
	margin-top: 10%
.apply-button-cont
	display: flex
	justify-content: center
	align-items: center
	position: fixed
	bottom: 10px
	width: 95%
	background-color: $blue-0
	border-radius: 10px
.apply-button
	padding: 7px
	width: 95%
	&:focus
		outline: none
	&:active
		transform: scale(0.95)
.notes-col
	white-space: pre-wrap
</style>
