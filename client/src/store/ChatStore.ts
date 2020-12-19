import { action, makeObservable, observable } from 'mobx'
import Api from '../Services/Api'
import Store from './Store'
import { IMessage } from '../components/Chat'
import errorHandler from '../helpers/errorHandler'

class ChatStore {
	messages: IMessage[]
	error: string | null

	constructor() {
		this.messages = []
		this.error = null
		makeObservable(this, {
			messages: observable,
			error: observable,
			initMessages: action,
			addMessage: action,
			sendMessage: action,
		})
	}

	initMessages(messages: IMessage[]) {
		this.messages = messages
	}

	addMessage(message: IMessage) {
		this.messages = [...this.messages, message]
	}

	async sendMessage(message: string) {
		try {
			return Api.sendMessage(message, Store.RoomStore.currentRoom!)
		} catch (error) {
			this.error = errorHandler(error)
		}
	}
}

export default new ChatStore()
