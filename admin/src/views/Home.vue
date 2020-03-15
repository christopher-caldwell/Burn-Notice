<template lang='pug'>
	v-container.splash-container
		v-row
			v-col
				h1.lightest-red SAFD
		v-row
			v-col
				p.splash-text.
					Welcome to the vacancy transfer portal of the SAFD.
				p.splash-text.
					Here you can view vacancies in other stations, make transfer requests, see your assignment history, and file reports.
		v-row
			v-col(cols='4' align='center')
				router-link(to='/register')
					v-btn Sign Up
			v-col(cols='4' align='center')
				router-link(to='/login')
					v-btn(:color="blueColor") Login
</template>

<script>
import { blueColor } from '@/data/constants'
export default {
	name: 'Home',
	data(){
		return {
			blueColor
		}
	}
}
</script>

<style lang='sass'>
	.splash-container
		margin-top: 15%
	.splash-text
		line-height: 2.0em
		font-size: 1.2em
</style>