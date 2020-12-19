import React, { useEffect } from 'react'
import styled from 'styled-components'
import Input from '../InputWithIcon'
import RoomItem from './RoomItem'
import { observer } from 'mobx-react-lite'
import Store from '../../store/Store'
import Error from '../Error'
import Loader from '../Loader'

export interface IRoom {
	name: string
	locked?: boolean
}

// const rooms: IRoom[] = [
// 	{ name: 'Sweet room' },
// 	{ name: 'room1', locked: true },
// 	{ name: 'Locked room', locked: true },
// ]

const Rooms = () => {
	useEffect(() => {
		Store.RoomListStore.fetchRooms()

		return ()=>{
			Store.RoomListStore.clear()
		}
	}, [])
	return (
		<RoomsContainer>
			{Store.RoomListStore.loading && <Loader />}
			{Store.RoomListStore.error && (
				<Error>{Store.RoomListStore.error}</Error>
			)}
			<Input imgSrc="/assets/svg/search.svg" placeholder="Search" />
			<RoomsList>
				{Store.RoomListStore.rooms.map((el) => (
					<RoomItem key={el.name} locked={el.locked}>
						{el.name}
					</RoomItem>
				))}
			</RoomsList>
		</RoomsContainer>
	)
}

const RoomsContainer = styled.div`
	max-width: 550px;
	width: 100%;
	height: 550px;
	margin: 0 auto;
	padding-top: 90px;
`
const RoomsList = styled.ul`
	height: 100%;
	width: 100%;
	margin-top: 8px;
	box-shadow: 0px 0px 9px -1px rgba(0, 0, 0, 0.25);
	overflow-y: auto;
`

export default observer(Rooms)
