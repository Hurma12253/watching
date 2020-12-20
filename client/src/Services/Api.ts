import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
	baseURL: 'http://localhost:8080/',
}

class Api {
	api: AxiosInstance

	constructor() {
		this.api = axios.create(config)
	}

	login(body: { name: string; password: string }) {
		return this.api.post('/user/signin', body)
	}

	authenticate() {
		return this.api.get('/user/authenticate')
	}

	fetchRooms() {
		return this.api.get('/rooms')
	}

	connectToRoom(body: { name: string; password?: string }) {
		return this.api.post('/room/comein', body)
	}

	checkRoomPassword(body: { name: string; password: string }) {
		return this.api.post('/room/checkpassword', body)
	}

	sendMessage(body: { message: string; roomName: string }) {
		return this.api.post('/message/create', body)
	}
}

export default new Api()
