import { makeAutoObservable } from 'mobx'
import errorHandler from '../helpers/errorHandler'
import Api from '../Services/Api'

class AuthStore {
	logged: boolean
	token: string | null
	name: string | null
	error: any
	tokenError: string | null

	constructor() {
		makeAutoObservable(this)
		this.token = JSON.parse(localStorage.getItem('Token') || 'null')
		this.logged = false
		this.name = null
		this.tokenError = null
	}

	login(name: string, password: string) {
		Api.login({name, password})
			.then(({ data }) => {
				this.token = data.token
				this.name = data.name
				this.logged = true

				localStorage.setItem('Token', JSON.stringify(this.token))
				this.clearError()
			})
			.catch((error) => {
				this.error = errorHandler(error)
			})
	}

	authenticate() {
		if (this.token) {
			Api.authenticate()
				.then(({ data }) => {
					this.name = data.name
					this.logged = true
				})
				.catch((error) => {
					this.tokenError = errorHandler(error)
				})
		}
	}

	logout() {
		this.token = null
		this.name = null
		this.logged = false

		localStorage.clear()
	}

	clearError(){
		this.error = null
		this.tokenError = null
	}
}

export default new AuthStore()
