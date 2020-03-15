<template lang='pug'>
	transition(:name="transitionName" mode="out-in")
		router-view
</template>

<script>
export default {
	name: 'UserRoot',
	data(){
		return {
			transitionName: 'slide-left'
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
  }
}
</script>