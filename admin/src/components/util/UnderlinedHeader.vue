<template lang='pug'>
span
	v-row(align='center')
		v-col
			h5 {{ header }}
		slot(name='side-piece')
	v-divider
</template>

<script>
export default {
	name: 'UnderlinedHeader',
	props: {
		header: {
			type: String,
			required: true
		}
	}
}
</script>

<style >

</style>