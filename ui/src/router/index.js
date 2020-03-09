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
    path: '/register',
    name: 'Register',
		component: () => import('@/views/visitor/Register.vue'),
  },  
  {
    path: '/skeleton',
    name: 'skeleton',
		component: () => import('@/components/skeleton-loaders/Station.vue'),
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
			},
    ]
  },
  {
    path: '/admin',
    name: 'AdminRoot',
    component: () => import('@/views/authenticated/Root.vue'),
    beforeEnter(to, from, next) {
			const isAuthenticated = store.getters['session/isAdmin']
			if(isAuthenticated || isRunningLocally){
				next()
			} else {
				next('/login')
			}
    },
    children: [
			{
				path: 'home',
				name: 'AdminHome',
				component: () => import('@/views/admin/Home.vue'),
			},
    ]
  },
]

export default new VueRouter({
  mode: 'history',
  routes
})
