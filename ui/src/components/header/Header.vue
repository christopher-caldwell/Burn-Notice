<template lang='pug'>
	div
		v-navigation-drawer(v-model="drawer" app clipped )
			v-list.internal-drawer-container.listing-listy.list(dense)
				v-subheader {{ usersName }}
				v-divider
				NavMenuItem(v-for="(route, index) in allowableRoutes" :key="index" :route="route")
			div.find-me
				v-switch(
					v-model="isDarkMode"
					@change="saveDarkModeSetting"
					label='Dark Mode'
					:color="lightRed"
					hide-details
				)
		v-app-bar(app clipped-left)
			v-app-bar-nav-icon(@click.stop="drawer = !drawer")
			v-toolbar-title.full-width
				v-row(justify='space-between' align='baseline')
					v-col
					v-col.flex-end(cols='2') 
						//- right sid content if any
</template>

<script>
import NavMenuItem from '@/components/header/NavMenuItem.vue'
import { routes } from '@/router/routes'
import { lightRed } from '@/data/constants'
import { mapGetters } from 'vuex'
export default {
	components: {
		NavMenuItem,
	},
	data() {
		return {
			routes,
			drawer: false,
			isDarkMode: true,
			lightRed
		}
	},
	computed: {
		...mapGetters('user', ['usersName']),
		...mapGetters('session', ['allowableRoutes', 'isInDarkMode']),
		isMobile(){
			return window.innerWidth < 1264
		},
		menuActivatorClassName(){
			return this.drawer
				? 'menu-open'
				: ''
		},
		menuActivatorIconName(){
			return this.drawer
				? 'mdi-close'
				: 'mdi-chevron-right'
		}
	},
	methods: {
		saveDarkModeSetting() {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark
		},
	},
	mounted() {
		this.$vuetify.theme.dark = true
	}
}
</script>

<style lang='sass'>
	.find-me
		height: 40px
		width: 130px
		position: absolute
		bottom: 15%
		right: 4%
		@media screen and (min-width: 786px)
			bottom: 5%
			right: 4%
	.internal-drawer-container
		height: 100%
	#menu-badge
		left: -1px !important
		top: 1px !important
</style>