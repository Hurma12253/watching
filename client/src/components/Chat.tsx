import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import Store from '../store/Store'
import { nanoid } from 'nanoid'

export interface IMessage {
	author: {
		name: string
	}
	text: string
	duty?: boolean
}

interface IChatProps {}

const Chat: React.FC<IChatProps> = () => {
	const [message, setMessage] = useState<string>('')
	const ref = useRef<any>()

	const sendMessage = (e: any) => {
		if (!message) return

		if (e.key === 'Enter') {
			Store.ChatStore.sendMessage(message)
			setMessage('')
		}
	}

	useEffect(() => {
		ref.current.scrollTop = ref.current.scrollHeight

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Store.ChatStore.messages])

	return (
		<ChatContainer>
			<Title>Messages</Title>
			<MessageContainer ref={ref}>
				{Store.ChatStore.messages.map((el, i) => (
					<Message
						key={nanoid()}
						name={el.author.name}
						duty={el.duty}
					>
						{el.text}
					</Message>
				))}
			</MessageContainer>
			<Input
				placeholder="write anything"
				value={message}
				onChange={(e: any) => setMessage(e.target.value)}
				onKeyDown={sendMessage}
			/>
		</ChatContainer>
	)
}

const ChatContainer = styled.div`
	position: relative;
	width: 100%;
	height: 70vh;
	padding: 13px 6px;
	border: 1px solid rgba(0, 0, 0, 0.16);

	display: grid;
	grid-template-rows: 2fr 9fr 1fr;
	overflow-x: hidden;
`
const Title = styled.h2`
	text-align: center;
	font-family: Roboto;
	color: #624848;
	font-size: 36px;
`
const MessageContainer = styled.ul`
	overflow-y: auto;
	overflow-x: hidden;
`

const Input = styled.input`
	outline: none;
	border: none;
	font-size: 20px;
	background: #eeeeee;
	border-radius: 30px;
	padding: 0px 20px;
	align-items: center;
`

const MessageStyle = styled.li`
	display: grid;
	grid-template-columns: 18% 82%;
	margin-bottom: 10px;
`
const AvatarContainer = styled.div`
	display: flex;
	justify-content: center;
`
const Avatar = styled.div`
	width: 3vw;
	height: 3vw;
	max-width: 50px;
	max-height: 50px;
	border-radius: 50%;
	background: gray;
`
const Body = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`
const Name = styled.div``
const MessageText = styled.div`
	max-width: 100%;
	text-overflow: ellipsis;
	word-wrap: break-word;
`
const DutyMessageStyle = styled.div`
	max-width: 100%;
	width: 100%;
	margin-bottom: 20px;
	padding-left: 10px;
	background-color: rgba(255, 255, 255, 0.1);
`

interface IMessageProps {
	children: string
	name?: string
	duty?: boolean
}

const Message: React.FC<IMessageProps> = ({ children, name, duty }) => {
	return !duty ? (
		<MessageStyle>
			<AvatarContainer>
				<Avatar />
			</AvatarContainer>
			<Body>
				<Name>{name}</Name>
				<MessageText>{children}</MessageText>
			</Body>
		</MessageStyle>
	) : (
		<DutyMessageStyle>{children}</DutyMessageStyle>
	)
}

export default observer(Chat)
