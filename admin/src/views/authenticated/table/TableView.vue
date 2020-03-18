<template lang='pug'>
	v-container
		TableHeader
		router-view
</template>

<script>
import TableHeader from '@/components/table/TableHeader.vue'
export default {
	name: 'TableView',
	components: {
		TableHeader
	}
}
</script>

<style>

</style>