<template lang='pug'>
	v-container
		v-row
			v-col(align='center')
				h1.amazon-orange Login
		v-row.oauth-row
		v-row.line-row(justify='center')
			v-col(cols='10')
				LineThroughText(text='or')
		v-row(justify='center')
			v-col(cols='10' align='center')
				v-text-field(outlined label='Email' :color="amazonOrange" :disabled="isLoading")
			v-col(cols='10' align='center')
				v-text-field(outlined label='Password' :color="amazonOrange" :disabled="isLoading")
		v-row
			v-col(align='center')
				router-link(to='/forgot-password') Forgot your password?
		v-row
			v-col(align='center')
				v-btn(:color="amazonOrange" :loading="isLoading") Login
		
</template>

<script>
import { amazonOrange } from '@/data/constants'
import LineThroughText from '@/components/util/LineThroughText.vue'

export default {
	name: 'Login',
	components: {
		LineThroughText,
	},
	data(){
		return {
			amazonOrange,
			isLoading: false
		}
	},
	computed: {
		isDarkMode(){
			return this.$vuetify.theme.isDark
				? 'dark'
				: 'light'
		},
	}
}
</script>

<style lang='sass' scoped>
@import '@/styles/variables'
a
	color: $amazon-orange
.oauth-row
	margin-top: 1%
.line-row
	margin: 4% 0
</style>