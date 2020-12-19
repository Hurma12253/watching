import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import socket from 'socket.io-client'
import Videoplayer from './Videoplayer'
import Chat from './Chat'
import Store from '../store/Store'
import query from 'query-string'
import Loader from './Loader'
import { Socket } from 'dgram'

const Container = styled.div`
	max-width: 1366px;
	margin: 0 auto;
	width: 100%;
	max-height: 100vh;
	height: 100%;
	padding: 0 10px;
	padding-top: 80px;

	display: grid;
	grid-template-columns: 75% 25%;
	column-gap: 10px;
`
interface IWatchingRoomProps {}

const WatchingRoom: React.FC<IWatchingRoomProps> = () => {
	const history = useHistory()
	const location = useLocation()
	let io: SocketIOClient.Socket | null = null

	const qry = query.parse(location.search)

	useEffect(() => {
		if (qry.room) {
			Store.RoomsStore.connectToRoom(String(qry.room)).then((res) => {
				if (res) {
					// eslint-disable-next-line react-hooks/exhaustive-deps
					io = socket('ws://localhost:8080/', {
						transports: ['websocket'],
					})

					io.on('connect', () => {
						console.log('socket connected')
					})

					io.on('disconnect',()=>{
						console.log('socket disconnected')
					})

					io.on('ROOM:MESSAGE', (message: any) => {
						Store.ChatStore.addMessage(message)
					})
					io.emit(
						'ROOM:JOIN',
						Store.AuthStore.name,
						Store.RoomsStore.currentRoom
					)
				}
			})
		}

		return () => {
			Store.RoomsStore.clear()
			if(io){
				io.disconnect()
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [history])

	return (
		<Container>
			{Store.RoomsStore.loading ? (
				<Loader />
			) : (
				<>
					<Videoplayer room={Store.RoomsStore.currentRoom || ''} />
					<Chat />
				</>
			)}
		</Container>
	)
}

export default observer(WatchingRoom)
