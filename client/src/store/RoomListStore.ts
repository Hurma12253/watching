import { makeAutoObservable } from 'mobx'
import Api from '../Services/Api'
// import Store from './Store'
import errorHandler from '../helpers/errorHandler'
import { IRoom } from '../components/Rooms/Rooms'

class RoomsStore {
	error: any
	loading: boolean
	rooms: IRoom[]
	permission: boolean

	constructor() {
		this.error = null
		this.loading = true
		this.rooms = []
		this.permission = false
		makeAutoObservable(this)
	}

	checkPassword(name: string, password: string) {
		Api.checkRoomPassword({name, password})
			.then(({data}) => {
				this.permission = true
			})
			.catch((error) => {
				this.error = errorHandler(error)
			})
	}

	fetchRooms() {
		this.loading = true
		Api.fetchRooms()
			.then(({data}) => {
				this.loading = false
				this.rooms = data
			})
			.catch((error) => {
				this.loading = false
				this.error = errorHandler(error)
			})
	}

	clear() {
		this.loading = false
		this.error = null
		this.rooms = []
		this.permission = false
	}
}

export default new RoomsStore()
