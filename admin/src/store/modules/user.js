import service from '@/services/user'
import { getItemFromLocalStorage, writeToLocalStorage } from '@/utils/localStorage'

export default {
	namespaced: true,
	state: {
		role: '',
		firstName: '',
		lastName: '',
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
		async login({ commit, dispatch }, { sap, password }){			
			const { userInformation, token } = await service.login(sap, password)
			dispatch('session/beginNewSession', token, { root: true })
			commit('UPDATE_USER', userInformation)
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