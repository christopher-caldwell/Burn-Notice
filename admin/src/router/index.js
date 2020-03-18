import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const isRunningLocally = process.env.NODE_ENV !== 'production'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
	},
	{
		path: '/skeleton',
		name: 'SkeletonTest',
		component: () => import('@/components/skeleton-loaders/Vacancy.vue'),
		meta: { transitionName: 'slide' }
	},
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/visitor/Login.vue'),
  },
  {
    path: '/user',
    name: 'UserRoot',
    component: () => import('@/views/authenticated/Root.vue'),
    beforeEnter(to, from, next) {
			const isAuthenticated = store.getters['session/isAuthenticated']
			if(isAuthenticated || isRunningLocally){
				next()
			} else {
				next('/login')
			}
    },
    children: [
			{
				path: 'profile',
				name: 'UserProfile',
				component: () => import('@/views/authenticated/profile/Profile.vue'),
			},
			{
				path: 'table',
				name: 'Table',
				component: () => import('@/views/authenticated/table/TableView.vue'),
				children: [
					{
						path: 'vacancy',
						name: 'VacancyTable',
						component: () => import('@/views/authenticated/vacancy/TableView.vue'),
					},
					{
						path: 'district',
						name: 'DistrictTable',
						component: () => import('@/views/authenticated/district/TableView.vue'),
					},
					{
						path: 'report',
						name: 'ReportTable',
						component: () => import('@/views/authenticated/report/TableView.vue'),
					},
					{
						path: 'transfer-request',
						name: 'TransferRequestTable',
						component: () => import('@/views/authenticated/transfer-request/TableView.vue'),
					},
					{
						path: 'fire-station',
						name: 'FireStationTable',
						component: () => import('@/views/authenticated/fire-station/TableView.vue'),
					},
				]
			},
			{
				path: 'home',
				name: 'UserHome',
				component: () => import('@/views/authenticated/Home.vue'),
				meta: { transitionName: 'slide' }
			},
			{
				path: 'vacancy/:id',
				name: 'Vacancy',
				component: () => import('@/views/authenticated/vacancy/Vacancy.vue'),
				meta: { transitionName: 'slide' }
			},
			{
				path: 'station/:id',
				name: 'FireStation',
				component: () => import('@/views/authenticated/fire-station/FireStation.vue'),
				meta: { transitionName: 'slide' }
			}			
    ]
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
