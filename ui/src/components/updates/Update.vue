<template lang='pug'>
		v-col
			v-card(
				class="mx-auto"
				max-width="345"
			)
				v-container
					v-row(align='center')
						v-col(cols=10 align='start')
							h3.card-header {{ update.name }}
						v-col(cols=2 align='start')
							v-btn(icon small)
								v-icon(small) mdi-close
						v-col(cols=6 align='start') {{ formattedDate }}
						v-col(cols=6 align='end' v-if="update.hasAction")
							router-link(:to="`/user/updates/${update.id}`")
								v-btn(icon small)
									v-icon( :color="blueColor") mdi-chevron-right
</template>


<script>
import { blueColor } from '@/data/constants'
import { format } from 'date-fns'
export default {
	name: 'Update',
	props: {
		update: {
			type: Object,
			required: true
		}
	},
	data(){
		return {
			blueColor
		}
	},
	computed: {
		formattedDate(){
			const dateToFormat = new Date(this.update.timeStamp)
			return format(dateToFormat, 'MMMM do, yyyy')
		}
	},
}
</script>

<style lang='sass'>

</style>