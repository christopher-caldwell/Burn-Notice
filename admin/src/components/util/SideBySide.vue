<template lang='pug'>
	v-row(:justify="rowJustification")
		v-col(:class="denseClass" :cols="titleCols" align-self='center' align='start') 
			h5(:class="titleClass") {{ title }}
		v-col(:class="denseClass" :cols="contentCols" align-self='center' align='start')
			h5(v-if="!useSlot" :class="contentClass") {{ content }}
			slot(name='content' v-else)
</template>

<script>
	export default {
		name: 'SideBySideInfo',
		props: {
			useDivider: {
				type: Boolean,
				required: false,
				default: true
			},
			isDense: {
				type: Boolean,
				required: false,
				default: false
			},
			rowJustification: {
				type: String,
				required: false,
				default: 'center'
			},
			useSlot: {
				type: Boolean,
				required: false,
				default: false
			},
			titleCols: {
				type: [String, Number],
				required: false,
				default: '4'
			},
			contentCols: {
				type: String,
				required: false,
				default: '6'
			},
			titleClass: {
				type: String,
				required: false,
				default: ''
			},
			contentClass: {
				type: String,
				required: false,
				default: ''
			},
			title: {
				type: String,
				required: true,
			},
			content: {
				type: [String, Number],
				required: false,
				default: ''
			}
		},
		computed: {
			denseClass(){
				return this.isDense
				? 'dense-col'
				: null
			}
		}
	}
</script>