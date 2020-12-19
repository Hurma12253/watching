import { AuthStore, RoomStore, ChatStore, RoomListStore } from './'

class Store {
	AuthStore: typeof AuthStore
	RoomStore: typeof RoomStore
	ChatStore: typeof ChatStore
	RoomListStore: typeof RoomListStore

	constructor() {
		this.AuthStore = AuthStore
		this.RoomStore = RoomStore
		this.ChatStore = ChatStore
		this.RoomListStore = RoomListStore
	}
}

export default new Store()
