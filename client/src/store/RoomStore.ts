import { makeAutoObservable } from 'mobx'
import Api from '../Services/Api'
import Store from './Store'
import errorHandler from '../helpers/errorHandler'
import { IRoom } from '../components/Rooms/Rooms'

class RoomsStore {
	error: any
	currentRoom: string | null
	loading: boolean
	rooms: IRoom[]
	result: boolean

	constructor() {
		this.error = null
		this.currentRoom = null
		this.loading = true
		this.rooms = []
		this.result = false
		makeAutoObservable(this)
	}

	connectToRoom(name: string) {
		this.loading = true
		return Api.connectToRoom({name})
			.then(({ data }) => {
				this.loading = false
				this.currentRoom = data.name
				Store.ChatStore.initMessages(data.messages)
			})
			.catch((error) => {
				this.error = errorHandler(error)
			})
	}

	checkPassword(name: string, password: string) {
		Api.checkRoomPassword({name, password})
			.then(({ data }) => {
				this.result = true
			})
			.catch((error) => {
				this.result = false
				this.error = errorHandler(error)
			})
	}

	fetchRooms() {
		Api.fetchRooms()
			.then(({ data }) => {
				this.rooms = data
			})
			.catch((error) => {
				this.error = errorHandler(error)
			})
	}

	clear() {
		this.loading = true
		this.error = null
		this.currentRoom = null
		Store.ChatStore.messages = []
	}
}

export default new RoomsStore()
