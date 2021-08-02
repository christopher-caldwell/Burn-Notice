<template lang='pug'>
		v-col
			v-card(
				class="mx-auto"
				max-width="345"
			)
				v-container
					v-row(align='start')
						v-col(cols=10 align='start')
							h3.card-header {{ update.title }}
						v-col(cols=2 align='start')
							ApolloMutation(
								:mutation="require('@/graphql/feed/ClearUpdate.gql')" 
								:notifyOnNetworkStatusChange="true"
								:variables="{ id: update.id, accountId: accountId }"
								:update="postMutationUpdate"
							)
								template(v-slot="{ mutate, loading }")
									v-btn(icon small @click="mutate()")
										v-icon(small v-if="!loading") mdi-close
										v-fade-transition(leave-absolute v-if="loading")
											v-progress-circular(indeterminate size='24')
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
	data(vm){
		return {
			blueColor,
			accountId: vm.$store.state.user.id
		}
	},
	computed: {
		formattedDate(){
			const dateToFormat = new Date(this.update.postDate)
			return format(dateToFormat, 'MMMM do, yyyy')
		}
	},
	methods: {
		postMutationUpdate(){
			this.$emit('removeUpdate', this.update.id)		
		},
	}
}
</script>

<style lang='sass'>

</style>