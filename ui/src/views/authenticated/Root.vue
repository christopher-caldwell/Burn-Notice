<template lang='pug'>
	ApolloQuery(
		:query="require('@/graphql/account/Account.gql')"
		:variables="{ id: userId }"
		:notifyOnNetworkStatusChange="true"
		@result="setUser"
	)
		template(v-slot="{ result: { data } }")
			transition(:name="transitionName" mode="out-in")
				router-view
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'UserRoot',
	data(vm){
		return {
			transitionName: 'slide-left',
			userId: vm.$store.state.user.id
		}
	},
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName

      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }

      this.transitionName = transitionName || this.transitionName

      next()
		})
	},
	methods: {
		...mapActions('user', ['updateUser']),
		setUser({ data }){
			if(data && data.account){
				this.updateUser(data.account)
			}
		}
	},
}
</script>