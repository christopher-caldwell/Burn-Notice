<template lang='pug'>
	v-container.station-container
		v-row(justify='center')
			v-col(cols=11)
				v-skeleton-loader.header-spacer(type="heading" width='500' height='70')
				v-skeleton-loader.card-spacer(type="image" height='120')
				v-skeleton-loader.card-spacer(type="image" height='120')
				v-skeleton-loader.card-spacer(type="image" height='120')
				v-skeleton-loader.card-spacer(type="image" height='120')
</template>

<script>
export default {
	name: 'AssignmentSkeleton',
}
</script>
