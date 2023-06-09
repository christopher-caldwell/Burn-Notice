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
    path: '/register',
    name: 'Register',
		component: () => import('@/views/visitor/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/visitor/Login.vue'),
  },
  {
    path: '/logout',
    name: 'LogOut',
    component: () => import('@/views/visitor/Logout.vue'),
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
				path: 'home',
				name: 'UserHome',
				component: () => import('@/views/authenticated/Home.vue'),
				meta: { transitionName: 'slide' }
			},
			{
				path: 'report',
				name: 'ReportHome',
				component: () => import('@/views/authenticated/report/Report.vue'),
				meta: { transitionName: 'slide' }
			},
			{
				path: 'report/file',
				name: 'ReportFile',
				component: () => import('@/views/authenticated/report/FileReport.vue'),
				meta: { transitionName: 'slide' }
			},
			{
				path: 'assignment-history',
				name: 'AssignmentHistory',
				component: () => import('@/views/authenticated/assignments/AssignmentHistory.vue'),
				meta: { transitionName: 'slide' }
			},
			{
				path: 'vacancy-search',
				name: 'VacancySearch',
				component: () => import('@/views/authenticated/vacancy/VacancySearch.vue'),
				meta: { transitionName: 'slide' },
			},
			{
				path: 'vacancy/:id',
				name: 'Vacancy',
				component: () => import('@/views/authenticated/vacancy/Vacancy.vue'),
				meta: { transitionName: 'slide' },
			},
			{
				path: 'vacancy/:id/confirmation',
				name: 'ApplicationConfirmation',
				component: () => import('@/views/authenticated/vacancy/Confirmation.vue'),
				meta: { transitionName: 'slide' },
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
