import { makeAutoObservable } from 'mobx'
import Api from '../Services/Api'

class Store {
	logged: boolean
	token: string | null
	name: string | null

	constructor() {
		makeAutoObservable(this)
		this.token = JSON.parse(localStorage.getItem('Token') || 'null')
		this.logged = false
		this.name = null
	}

	async login(name: string, password: string) {
		try {
			const { data } = await Api.login(name, password)

			if (data && data.token) {
				this.token = data.token
				this.name = data.name
				this.logged = true

				localStorage.setItem('Token', JSON.stringify(this.token))
			}
		} catch (error) {
			console.log(error)
		}
	}

	async authenticate() {
		try {
			if (this.token) {
				const { data } = await Api.authenticate(this.token)

				if (data) {
					this.name = data.name
					this.logged = true
				}
			}
		} catch (error) {
			console.log(error)
		}
	}
}

export default new Store()
