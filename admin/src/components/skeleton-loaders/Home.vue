<template lang='pug'>
	v-container.station-container
		v-row(justify='center' align-items='center')
			v-col(cols=11)
				v-skeleton-loader(type="text")
		v-row.openings-cont(justify='center')
			v-col(cols=10)
				v-skeleton-loader.card-spacer(type="image" max-width='345' height='120')
		v-row(justify='center' align-items='center')
			v-col(cols=11)
				v-skeleton-loader(type="text")
		v-row.openings-cont(justify='center')
			v-col(cols=10)
				v-skeleton-loader.card-spacer(type="image" max-width='345' height='120')
				v-skeleton-loader.card-spacer(type="image" max-width='345' height='120')
		v-row(justify='center')
			v-col(cols=11)
</template>

<script>
export default {
	name: 'HomeSkeleton',
}
</script>

<style lang='sass'>
.v-skeleton-loader__article
	background: none !important
.header-spacer
	margin-bottom: 3%
.card-spacer
	margin-bottom: 7%
</style>