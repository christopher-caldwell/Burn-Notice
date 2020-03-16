<template lang='pug'>
	v-col
		v-card(
			class="mx-auto"
			max-width="345"
		)
			v-container
				v-row(align='center')
					v-col(cols=10 align='start')
						h3.card-header Posted:
						h5.card-header {{ formattedDate }}
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
					v-col(cols=5 align='start').
						#[h4 Applicants:] {{ vacancy.numOfApplicants }}
					v-col(cols=5 align='start').
						#[h4 Engine:] {{ mapBoolToText(vacancy.isEngine) }}
					v-col(cols=2 align='end')
						router-link(:to="`/user/vacancy/${vacancy.id}`")
							v-btn(icon )
								v-icon( large :color="blueColor") mdi-chevron-right
					
</template>

<script>
import { mapBoolToText } from '@/utils'
import { blueColor } from '@/data/constants'
import { format } from 'date-fns'
const menuActionEnum = {
	'Report an issue': ({ id }) => {
		return `/user/report-issue?type=vacancy&id=${id}`
	}
}
export default {
	name: 'StationViewVacancy',
	props: {
		vacancy: {
			type: Object,
			required: true
		},
	},
	data(){
		return {
			blueColor,
			menuOptions: Object.keys(menuActionEnum)
		}
	},
	computed: {
		formattedDate(){
			const dateToFormat = new Date(this.vacancy.postDate)
			return format(dateToFormat, 'MMMM do, yyyy')
		}
	},
	methods: {
		mapBoolToText,
		takeMenuAction(event){
			const routeToNavTo = menuActionEnum[event](this.vacancy)
			this.$router.push(routeToNavTo)
		},
		
	}
}
</script>

<style lang='sass'>
.side-by-side
	display: inline-block
	margin-right: 14px
</style>