import socket from 'socket.io-client'
import Store from '../store/Store'

export class ChatSocket {
	io: SocketIOClient.Socket

	constructor() {
		this.io = socket('ws://localhost:8080', {
			transports: ['websocket'],
		})

		this.io.on('connect', () => {
			console.log('socket connected')
		})

		this.io.on('disconnect', () => {
			console.log('socket disconnected')
		})

		this.io.on('ROOM:MESSAGE', (message: any) => {
			console.log('message ', message)
			Store.ChatStore.addMessage(message)
		})
	}

	connect() {
		this.io.emit(
			'ROOM:JOIN',
			Store.AuthStore.name,
			Store.RoomStore.currentRoom
		)
	}

	disconnect() {
		this.io.disconnect()
	}
}
