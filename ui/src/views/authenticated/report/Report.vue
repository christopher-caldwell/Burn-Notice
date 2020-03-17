<template lang='pug'>
	ApolloQuery(
		:query="require('@/graphql/report/ReportsByAccountId.gql')" 
		:variables="{ id: accountId }" 
		:notifyOnNetworkStatusChange="true"
	)
		template(v-slot="{ result: { loading, data, error } }")
			SkeletonLoader(v-if="loading")
			div(v-if="error") {{ error }}
			v-container(v-if="data")
				v-row
					v-col(align='start')
						h1.update-header Reports
						v-divider
				v-row.reports-display
					v-col(align='center')
						Report( v-for="(report, index) in data.reportsByAccountId" :report="report" :key="`${index}-${report.id}`")
						h3(v-if="!data.reportsByAccountId.length") It looks like you haven't filed any reports yet.
				v-row
					v-col(align='start')
						router-link(to='/user/report/file')
							FullWidthButton(text='File Report')
</template>

<script>
import Report from '@/components/cards/Report.vue'
import Update from '@/components/cards/Update.vue'
import FullWidthButton from '@/components/util/FullWidthButton.vue'
import SkeletonLoader from '@/components/skeleton-loaders/Report.vue'
import { vacancies, mockUpdate } from '@/data/mockData'
export default {
	Name: 'ReportHome',
	components: {
		Report,
		Update,
		SkeletonLoader,
		FullWidthButton
	},
	data(){
		return {
			vacancies,
			mockUpdate
		}
	},
	computed: {
		accountId(){
			return this.$store.state.user.id
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
.notes-col
	white-space: pre-wrap
.reports-display
	max-height: 70vh
	overflow: scroll
</style>
