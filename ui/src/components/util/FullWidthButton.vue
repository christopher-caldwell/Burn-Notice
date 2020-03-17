<template lang='pug'>
	div.apply-button-cont(:class="customClass")
		button.apply-button(@click="clickHandler" :disabled="isDisabled")
			h3(v-if="!isLoading") {{ text }}
			v-fade-transition(leave-absolute v-if="isLoading")
					v-progress-circular(indeterminate size='28')
</template>

<script>
export default {
	name: 'FullWidthButton',
	props: {
		text: {
			type: String,
			required: true
		},
		isLoading: {
			type: Boolean,
			required: false,
			default: false
		},
		customClass: {
			type: String,
			required: false,
			default: ''
		},
		isDisabled: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	methods: {
		clickHandler(){
			this.$emit('buttonClicked')
		}
	}
}
</script>

<style lang='sass'>
.apply-button-cont
	display: flex
	justify-content: center
	align-items: center
	position: fixed
	bottom: 10px
	width: 95%
	background-color: $blue-0
	border-radius: 10px
.apply-button
	padding: 7px
	width: 95%
	&:focus
		outline: none
	&:active
		transform: scale(0.95)
</style>