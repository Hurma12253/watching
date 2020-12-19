import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
	baseURL: 'http://localhost:8080/',
}

class Api {
	api: AxiosInstance

	constructor() {
		this.api = axios.create(config)
	}

	login(name: string, password: string) {
		const body = {
			name,
			password,
		}

		return this.api.post('/user/signin', body)
	}

	authenticate() {
		return this.api.get('/user/authenticate')
	}

	fetchRooms(){
		return this.api.get('/rooms')
	}

	connectToRoom(name: string, password?: string) {
		const body = {
			name,
			password,
		}
		return this.api.post('/room/comein', body)
	}

	checkRoomPassword(name: string, password: string){
		const body = {
			name,
			password
		}

		return this.api.post('/room/checkpassword', body)
	}

	sendMessage(message: string, room: string){
		const body = {
			message,
			roomName: room
		}

		return this.api.post('/message/create', body)
	}
}

export default new Api()
