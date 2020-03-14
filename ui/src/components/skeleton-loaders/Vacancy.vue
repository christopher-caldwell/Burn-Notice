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
				v-skeleton-loader.header-spacer-side-by-side(type="heading" width='200px')
				v-skeleton-loader.header-spacer-side-by-side(type="heading" width='200px')
				v-skeleton-loader.header-spacer-side-by-side(type="heading" width='200px')
		v-row.openings-cont(justify='center')
			v-col
				v-skeleton-loader(type="text")
		v-row.apply-button-skeleton(justify='center')
			v-col(cols=11)
				v-skeleton-loader(type="image" height='50')
				
		
</template>

<script>
export default {
	name: 'VacancySkeleton',
}
</script>

<style lang='sass'>
.v-skeleton-loader__article
	background: none !important
.header-spacer
	margin-bottom: 3%
.header-spacer-side-by-side
	margin-bottom: 10%
.card-spacer
	margin-bottom: 7%
.apply-button-skeleton
	width: 100%
	position: fixed !important
	bottom: 10px
</style>