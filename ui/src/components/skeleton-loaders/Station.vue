<template lang='pug'>
	v-container.station-container
		v-row(justify='center' align-items='center')
			v-col(cols=11)
				v-skeleton-loader.header-spacer(type="heading")
				v-skeleton-loader.header-spacer(type="heading" width='100px')
				v-skeleton-loader.header-spacer(type="heading" width='200px')
		v-row.openings-cont(justify='center')
			v-col
				v-skeleton-loader(type="text")
		v-row(justify='center')
			v-col(cols=11)
				v-skeleton-loader.card-spacer(type="image" height='120')
				v-skeleton-loader(type="image" height='120')
</template>

<script>
export default {
	name: 'StationSkeleton',
}
</script>
