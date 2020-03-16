<template lang='pug'>
	ApolloQuery(
		:query="require('@/graphql/vacancy/Vacancies.gql')" 
		:variables="{ limit: 5 }" 
		:notifyOnNetworkStatusChange="true"
	)
		template(v-slot="{ result: { loading, data, error } }")
			SkeletonLoader(v-if="loading")
			v-container(v-if="data")
				v-row(justify='center' align-items='center')
					v-col(cols=11)
						h1 Vacancies
						v-divider.divider-spacer
				v-row
					v-col
						//- Searching
				v-row
					v-col
						Vacancy(
							v-for="(vacancy, index) in data.vacancies"
							:vacancy="vacancy"
							:key="`vacancy-${vacancy.id}`"
						)
				
</template>

<script>
import SkeletonLoader from '@/components/skeleton-loaders/Assignment.vue'
import Vacancy from '@/components/cards/Vacancy.vue'
export default {
	name: 'VacancyList',
	components: {
		SkeletonLoader,
		Vacancy
	},
	computed: {
		accountId(){
			return this.$store.state.user.id
		}
	}
}
</script>

<style>

</style>