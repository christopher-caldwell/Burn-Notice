<template lang='pug'>
	v-menu(offset-y)
			template(v-slot:activator="{ on }")
				span
					v-row(v-on="on")
						v-col(cols=9)
							h2 {{ currentHeader }}
						v-col(align='end')
							v-btn(text)
								v-icon mdi-menu-down
					v-divider
			v-list
				v-list-item(
					v-for="(item, index) in availableOptions"
					:key="`option-${index}`"
					@click="emitClicked(item)"
				)
					v-list-item-title {{ item.text}} 
</template>

<script>
export default {
	name: 'HeaderDropdown',
	props: {
		currentHeader: {
			type: String,
			required: true
		},
		availableOptions: {
			type: Array,
			required: true
		},
	},
	methods: {
		emitClicked(clickedOption){
			this.$emit('clickedHeader', clickedOption)
		}
	}
}
</script>

<style>

</style>