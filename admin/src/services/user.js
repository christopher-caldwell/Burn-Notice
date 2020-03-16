import client from '@/client'

export default {
  async login(sap, password) {
		const { data } = await client.post('/login', { sap, password })
		return data
	}
}
