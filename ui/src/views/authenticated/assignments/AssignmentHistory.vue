<template lang='pug'>
	ApolloQuery(
		:query="require('@/graphql/assignment/AssignmentHistory.gql')" 
		:variables="{ accountId }" 
		:notifyOnNetworkStatusChange="true"
	)
		template(v-slot="{ result: { loading, data, error } }")
			SkeletonLoader(v-if="loading")
			v-container(v-if="data")
				v-row(justify='center' align-items='center')
					v-col(cols=11)
						h1 Assignment History
						v-divider.divider-spacer
				v-row
					v-col
						Assignment(
							v-for="(assignment, index) in data.assignmentsByAccountId"
							:assignment="assignment"
							:key="`assignment-${assignment.index}`"
						)
				
</template>

<script>
import SkeletonLoader from '@/components/skeleton-loaders/Assignment.vue'
import Assignment from '@/components/cards/Assignment.vue'
export default {
	name: 'AssignmentHistory',
	components: {
		SkeletonLoader,
		Assignment
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