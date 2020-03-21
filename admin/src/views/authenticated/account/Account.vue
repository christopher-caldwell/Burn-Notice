<template lang='pug'>
	ApolloQuery(
		:query="require('@/graphql/account/Account.gql')"
		:variables="{ id: accountId }"
		:notifyOnNetworkStatusChange="true"
	)
		template(v-slot="{ result: { loading, data } }")
			SkeletonLoader(v-if="loading")
			v-container(v-if="data")
				v-row
					v-col
						h1 {{ data.account.firstName }} {{ data.account.lastName }}
						v-divider.divider-spacer
				UnderlinedHeader(header='General Info')
				SideBySide(rowJustification='start' title='Can Transfer' :content="mapBoolToText(data.account.isEligibleForTransfer)")
				SideBySide(rowJustification='start' title='Last Logged In' :content="formatDateTime(data.account.lastLoggedInAt)")
				SideBySide(rowJustification='start' title='Account Created' :content="formatDate(data.account.createdAt)")
</template>

<script>
import SideBySide from '@/components/util/SideBySide.vue'
import UnderlinedHeader from '@/components/util/UnderlinedHeader.vue'
import SkeletonLoader from '@/components/skeleton-loaders/Home.vue'
import { mapBoolToText, formatDateTime, formatDate } from '@/utils/'
export default {
	name: 'Account',
	components: {
		SkeletonLoader,
		UnderlinedHeader,
		SideBySide
	},
	computed: {
		accountId(){
			return this.$route.params.id
		}
	},
	methods: {
		mapBoolToText,
		formatDateTime,
		formatDate
	}
}
</script>

<style lang='sass'>
</style>