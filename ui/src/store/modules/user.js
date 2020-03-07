import service from '@/services/user'
import { getItemFromLocalStorage, writeToLocalStorage } from '@/utils/localStorage'

export default {
	namespaced: true,
	state: {
		role: '',
		firstName: '',
		lastName: '',
		locale: 'en',
		email: '',
		sap: '',
		id: ''
	},
	getters: {
		allowedRoutes(state){
			return state.allowedRoutes
		},
		usersName(state){
			if(state.firstName && state.lastName){
				return state.firstName + ' ' + state.lastName
			} else {
				return ''
			}
		},
	},
	actions: {
		async registerUser({ commit, dispatch }, userPayload){
			const { userProfile, token } = await service.standardRegister(userPayload)
			dispatch('session/beginNewSession', token, { root: true })
			commit('UPDATE_USER', userProfile)
		},
		async login({ commit, dispatch }, { sap, password }){			
			const { userProfile, token } = await service.login(sap, password)
			dispatch('session/beginNewSession', token, { root: true })
			commit('UPDATE_USER', userProfile)
		},
		restoreUserToStore({ commit }){
			const prevUser = getItemFromLocalStorage('user')
			if(prevUser){
				commit('UPDATE_USER', prevUser)
			}
		}
	},
	mutations: {
		UPDATE_USER(state, userInformation){
			Object.keys(userInformation).forEach(key => {
				state[key] = userInformation[key]
			})
			writeToLocalStorage('user', userInformation)
		}
	}
}