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

	constructor() {
		this.error = null
		this.currentRoom = null
		this.loading = true
		this.rooms = []
		makeAutoObservable(this)
	}

	async connectToRoom(name: string) {
		try {
			this.loading = true
			const { data } = await Api.connectToRoom(name)

			if (data) {
				this.loading = false
				this.currentRoom = data.name
				Store.ChatStore.initMessages(data.messages)
				return true
			}
		} catch (error) {
			console.log(error)
			this.error = errorHandler(error)
			return false
		}
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
			const { data } = await Api.fetchRooms()

			if (data) {
				this.rooms = data
			}
		} catch (error) {
			this.error = errorHandler(error)
		}
	}

	clear() {
		this.error = null
		this.currentRoom = null
		Store.ChatStore.messages = []
	}
}

export default new RoomsStore()
