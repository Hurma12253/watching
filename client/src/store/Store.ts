import {AuthStore, RoomsStore, ChatStore} from './'

class Store {
	AuthStore: typeof AuthStore
	RoomsStore: typeof RoomsStore
	ChatStore: typeof ChatStore

	constructor() {
		this.AuthStore = AuthStore
		this.RoomsStore = RoomsStore
		this.ChatStore = ChatStore
	}
}

export default new Store()
