<template lang='pug'>
	v-container
		v-row
			v-col(align='center')
				Vacancy( v-for="vacancy in vacancies" :vacancy="vacancy" :key="vacancy.id")
</template>

<script>
import Vacancy from '@/components/vacancies/Vacancy.vue'
import { vacancies } from '@/data/mockData'
export default {
	Name: 'UserHome',
	components: {
		Vacancy
	},
	data(){
		return {
			vacancies: vacancies,
		}
	}
}
</script>

<style lang='sass'>
.user-home-actions
	margin-top: 15%
.user-home-action
	margin-top: 5%
</style>