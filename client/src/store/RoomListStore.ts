import { makeAutoObservable } from 'mobx'
import Api from '../Services/Api'
// import Store from './Store'
import errorHandler from '../helpers/errorHandler'
import { IRoom } from '../components/Rooms/Rooms'

class RoomsStore {
	error: any
	loading: boolean
	rooms: IRoom[]

	constructor() {
		this.error = null
		this.loading = true
		this.rooms = []
		makeAutoObservable(this)
	}

	async checkPassword(name: string, password: string) {
		try {
			const { data } = await Api.checkRoomPassword(name, password)

			if (data) {
				return true
			}
		} catch (error) {
			this.error = errorHandler(error)
			return false
		}
	}

	async fetchRooms() {
		try {
            this.loading = true
            const { data } = await Api.fetchRooms()
            this.loading = false

			if (data) {
				this.rooms = data
			}
		} catch (error) {
            this.loading = false
			this.error = errorHandler(error)
		}
	}

	clear() {
		this.loading = false
		this.error = null
		this.rooms = []
	}
}

export default new RoomsStore()
