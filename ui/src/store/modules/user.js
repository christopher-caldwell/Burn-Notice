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
		id: '',
		isEligibleForTransfer: false
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
			const { userInformation, token } = await service.register(userPayload)
			dispatch('session/beginNewSession', token, { root: true })
			userInformation.isEligibleForTransfer = true
			commit('UPDATE_USER', userInformation)
		},
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
		},
		updateUser({ commit }, newUser){
			commit('UPDATE_USER', newUser)
		},
		updateEligibility({ commit }){
			const prevUser = getItemFromLocalStorage('user')
			prevUser.isEligibleForTransfer = false
			writeToLocalStorage('user', prevUser)
			commit('UPDATE_ELIGIBILITY')
		}
	},
	mutations: {
		UPDATE_USER(state, userInformation){
			Object.keys(userInformation).forEach(key => {
				state[key] = userInformation[key]
			})
			writeToLocalStorage('user', userInformation)
		},
		UPDATE_ELIGIBILITY(state){
			state.isEligibleForTransfer = false
		}
	}
}