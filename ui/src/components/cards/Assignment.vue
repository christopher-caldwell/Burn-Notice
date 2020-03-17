<template lang='pug'>
	v-col
		v-card(
			class="mx-auto"
			max-width="345"
		)
			v-container
				v-row(align='center')
					v-col(cols=10 align='start')
						h3.card-header {{ assignment.assignedStation.name }}
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
				v-row(justify='space-between')
					v-col(cols=5 align='start').
						#[h4 Start Date:] {{ formattedStartDate }}
					v-col(cols=5 align='start' v-if="assignment.endDate").
						#[h4 End Date:] {{ formattedEndDate }}
					v-col(cols=2 align='end')
						router-link(:to="`/user/assignment/${assignment.id}`")
							v-btn(icon )
								v-icon( large :color="blueColor") mdi-chevron-right
					
</template>

<script>
import { blueColor } from '@/data/constants'
import { formatDate } from '@/utils/'
const menuActionEnum = {
	'See station': ({ assignedStation: { id } }) => {
		return `/user/station/${id}`
		},
	'Report an issue': ({ id }) => {
		return `/user/report-issue?type=assignment&id=${id}`
	}
}
export default {
	name: 'Assignment',
	props: {
		assignment: {
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
		formattedStartDate(){
			return formatDate(this.assignment.startDate)
		},
		formattedEndDate(){
			try {
				return formatDate(this.assignment.endDate)
			} catch(e){
				return null
			}
		}
	},
	methods: {
		takeMenuAction(event){
			const routeToNavTo = menuActionEnum[event](this.assignment)
			this.$router.push(routeToNavTo)
		},
		
	}
}
</script>

<style lang='sass'>

</style>