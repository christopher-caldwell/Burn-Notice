<template lang='pug'>
	v-container
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
				Update(:update="mockUpdate")
		v-row
			v-col(align='start')
				h5.update-header Openings
				v-divider
		v-row
			v-col(align='center')
				Vacancy( v-for="vacancy in vacancies" :vacancy="vacancy" :key="vacancy.id")
</template>

<script>
import Vacancy from '@/components/vacancy/Vacancy.vue'
import Update from '@/components/updates/Update.vue'
import { vacancies, mockUpdate } from '@/data/mockData'
export default {
	Name: 'UserHome',
	components: {
		Vacancy,
		Update
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