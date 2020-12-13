import React from 'react'
import styled from 'styled-components'
import query from 'query-string'
import socket from 'socket.io-client'
import Videoplayer from './Videoplayer'
import Chat from './Chat'

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
interface IWatchingRoomProps{
	location: any
	history: any
}

const WatchingRoom: React.FC<IWatchingRoomProps> = ({location, history}) => {
	const {name, room} = query.parse(location.search)

	if(!name || !room ){
		history.push('/404')
	}

	const io = socket('/')
	io.on('connect', () => {
		io.emit('DIALOG:JOIN', name, room)
	})

	return (
		<Container>
			<Videoplayer />
			<Chat io={io} room={room}/>
		</Container>
	)
}

export default WatchingRoom
