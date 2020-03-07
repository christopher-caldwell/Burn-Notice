import client from '@/client'

export default {
  async login(sap, password) {
		const { data } = await client.post('/login', { sap, password })
		return data
	},
	async standardRegister(userPayload){
		const { data } = await client.post('/register', userPayload)
		return data
	}
}
