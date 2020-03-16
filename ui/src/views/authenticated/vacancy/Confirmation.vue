<template lang='pug'>
	v-container
		v-row(justify='center' align-items='center')
			v-col(cols=11)
				h1 Applied
		v-row
			v-col You have successfully apply to transfer.
		v-row
			v-col.
				The approving authority will look your application over, and make a decision. 
				You will be notified via email when any updates to your application are made.
		v-row
			v-col
				v-btn(text large) Home
</template>

<script>
export default {
	name: 'ApplicationConfirmation'
}
</script>

<style>

</style>