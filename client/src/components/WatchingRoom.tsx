import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { ChatSocket } from '../Services/ChatSocket'
import Videoplayer from './Videoplayer'
import Chat from './Chat'
import Store from '../store/Store'
import query from 'query-string'
import Loader from './Loader'

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
	let io: ChatSocket | null = null

	const qry = query.parse(location.search)

	useEffect(() => {
		if (qry.room) {
			Store.RoomStore.connectToRoom(String(qry.room)).then(() => {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				io = new ChatSocket()
				io.connect()
			})
		}

		return () => {
			Store.RoomStore.clear()
			if (io) {
				io.disconnect()
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [history])

	return (
		<Container>
			{Store.RoomStore.loading ? (
				<Loader />
			) : (
				<>
					<Videoplayer room={Store.RoomStore.currentRoom || ''} />
					<Chat />
				</>
			)}
		</Container>
	)
}

export default observer(WatchingRoom)
