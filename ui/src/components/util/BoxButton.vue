<template lang='pug'>
	div(@click="emitClick").link-container.flex-centered
		h3(v-if="!isLoading") {{ buttonText }}
		v-progress-circular(v-else indeterminate :color="blueColor")
</template>

<script>
import { blueColor } from '@/data/constants'
export default {
	name: 'BoxButton',
	props: {
		isLoading: {
			type: Boolean,
			required: false,
			default: false
		},
		buttonText: {
			type: String,
			required: true
		}
	},
	data(){
		return {
			blueColor
		}
	},
	methods: {
		emitClick(){
			this.$emit('buttonClicked')
		}
	}
}
</script>

<style lang='sass'>
@import '@/styles/variables'
.link-container
	width: 100%
	padding: 10px
	border: 3px $red-0 solid
	color: $red-0
	border-radius: 5%
	cursor: pointer
	&:active
		transform: scale(0.96)
</style>