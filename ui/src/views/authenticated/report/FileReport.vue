<template lang='pug'>
	v-container
		v-row
			v-col
				h1 File Report
				v-divider.divider-spacer
		v-row
			v-col
				v-tabs( center-active v-model="activeTab")
					v-tab Times
					v-tab Conditions
					v-tab Team
					v-tab Review
				v-tabs-items(v-model="activeTab") 
					v-tab-item
						TimePage
					v-tab-item
						ConditionsPage
					v-tab-item
						TeamPage
			
</template>

<script>
import TimePage from '@/components/report/TimePage.vue'
import ConditionsPage from '@/components/report/ConditionsPage.vue'
import TeamPage from '@/components/report/TeamPage.vue'
export default {
	name: 'FileReport',
	components: {
		TimePage,
		ConditionsPage,
		TeamPage
	},
	data(){
		return {
			activeTab: null,
		}
	}
}
</script>

<style lang='sass'>
.v-tabs-items
	background-color: transparent !important
</style>