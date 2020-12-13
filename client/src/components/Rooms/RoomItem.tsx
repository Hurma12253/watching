import React from 'react'
import styled from 'styled-components'

interface IRoom {
	children: string
	locked?: boolean
}

const RoomItem: React.FC<IRoom> = ({ children, locked }) => {
	return (
		<Room>
			<AvatarWrapper>
				<Avatar />
			</AvatarWrapper>
			<Body>
				<Name>{children}</Name>
				{locked && <img src="/assets/svg/lock.svg" alt="locked" />}
			</Body>
		</Room>
	)
}

const Room = styled.li`
	display: flex;
	padding: 9px 10px;
	padding-right: 0px;
	cursor: pointer;
`
const AvatarWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 16px;
`
const Avatar = styled.div`
	width: 38px;
	height: 38px;
	border-radius: 50%;
	background-color: #c4c4c4;
`
const Body = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #e5e5e5;
	width: 100%;

	& img {
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}
`
const Name = styled.div`
	font-size: 18px;
	color: #636363;
`

export default RoomItem
