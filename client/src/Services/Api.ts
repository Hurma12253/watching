import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
	baseURL: 'http://localhost:8080/',
}

class Api {
	private api: AxiosInstance

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

	authenticate(token: string) {
		return this.api.get('/user/authenticate', {
			headers: {
				Token: token,
			},
		})
	}
}

export default new Api()
