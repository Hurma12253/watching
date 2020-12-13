import React, { useState } from 'react'
import styled from 'styled-components'
import Store from '../store/Store'

interface IWriteNameScreenProps {
	props: any
	history: any
}

const WriteNameScreen: React.FC<IWriteNameScreenProps> = ({ history }) => {
	const [name, setName] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const submitHandler = (e: any) => {
		e.preventDefault()

		Store.login(name, password)
	}

	return (
		<Container>
			<Title>What is your name?</Title>
			{/* {error && <h4>{error}</h4>} */}
			<Input
				placeholder="Write your name..."
				value={name}
				onChange={(e: any) => setName(e.target.value)}
			/>
			<Input
				placeholder="Write password"
				value={password}
				onChange={(e: any) => setPassword(e.target.value)}
			/>
			<Submit onClick={submitHandler}>let's go!</Submit>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 160px;
`
const Title = styled.div`
	font-size: 75px;
	color: #ad2626;
	margin-bottom: 80px;
`

const Input = styled.input`
	max-width: 430px;
	width: 100%;
	height: 70px;
	border-radius: 55px;
	outline: none;
	border: none;
	padding: 0 40px;
	background: #e4e4e4;
	font-size: 34px;
	line-height: 34px;
	align-items: center;
	margin-bottom: 30px;
`
const Submit = styled.button`
	width: 100%;
	max-width: 430px;
	height: 43px;
	border-radius: 55px;
	border: none;
	outline: none;
	background-color: #a4abee;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px 1px;
	transition: 0.1s;
	cursor: pointer;

	font-size: 24px;
	color: #ffffff;

	&:hover {
		box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 10px 1px;
	}

	&:active {
		box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 10px 1px;
	}
`

export default WriteNameScreen
