<template lang='pug'>
	v-row
		v-col
			h5 {{ header }}
			v-divider.divider-spacer
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

<style>

</style>