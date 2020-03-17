export default {
	namespaced: true,
	state: {
		fireStations: []
	},
	getters: {
		fireStations(state){
			return state.fireStations
		}
	},
	actions: {
		updateFireStations({ commit }, fireStations){
			commit('UPDATE_FIRE_STATIONS', fireStations)
		}
	},
	mutations: {
		UPDATE_FIRE_STATIONS(state, fireStations){
			state.fireStations = fireStations
		},
	}
}