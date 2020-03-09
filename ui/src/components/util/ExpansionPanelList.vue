<template lang='pug'>
	v-expansion-panels.no-background-panel(v-model="isPanelOpen")
		v-expansion-panel
				v-expansion-panel-header.no-padding
					template(v-slot:default="{ open }")
						v-row
							v-col
								h3 {{ title }}
								v-divider.divider-spacer
				v-expansion-panel-content
					slot(name='content')
</template>

<script>
export default {
	name: 'ExpansionPanelList',
	props: {
		title: {
			type: String,
			required: true
		},
		value: {
			type: [Number, Boolean],
			required: false,
			default: false
		}
	},
	computed: {
		isPanelOpen: {
			get(){ return this.value },
			set(){ this.$emit('input') }
		}
	}
}
</script>

<style lang='sass'>

.no-background-panel
	& .v-expansion-panel
		background-color: transparent !important
		box-shadow: none !important
		&::before
			position: relative !important
	&	.v-expansion-panel-content__wrap
		padding: 0 !important

</style>