<template lang='pug'>
	v-col
		v-card(
			class="mx-auto"
			max-width="345"
		)
			v-container
				v-row(align='center')
					v-col(cols=10 align='start')
						h3.card-header {{ report.fireStation.name }}
					v-col(cols=2 align='start')
						v-menu.menu-icon(bottom left)
							template(v-slot:activator="{ on }")
								v-btn( dark icon v-on="on")
									v-icon mdi-dots-vertical
							v-list
								v-list-item(
									v-for="(item, i) in menuOptions"
									:key="i"
									@click="takeMenuAction(item)"
								)
									v-list-item-title {{ item }}          
					v-col(cols=6 align='start').
						#[h4 Submitted:] {{ formattedDate }}
					v-col(cols=6 align='end')
						router-link(:to="`/user/report/${report.id}`")
							v-btn(icon )
								v-icon( large :color="blueColor") mdi-chevron-right	
</template>

<script>
import { blueColor } from '@/data/constants'
import { formatDate } from '@/utils/'
const menuActionEnum = {
	'See station': ({ station: { id } }) => {
		return `/user/station/${id}`
		},
	'Report an issue': ({ id }) => {
		return `/user/report-issue?type=report&id=${id}`
	}
}
export default {
	name: 'Report',
	props: {
		report: {
			type: Object,
			required: true
		}
	},
	data(){
		return {
			blueColor,
			menuOptions: Object.keys(menuActionEnum)
		}
	},
	computed: {
		formattedDate(){
			return formatDate(this.report.createdAt)
		}
	},
	methods: {
		takeMenuAction(event){
			const routeToNavTo = menuActionEnum[event](this.report)
			this.$router.push(routeToNavTo)
		},
		
	}
}
</script>

<style lang='sass'>

</style>