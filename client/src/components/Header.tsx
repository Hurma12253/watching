import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Container from './Container'
import { observer } from 'mobx-react-lite'
import Store from '../store/Store'

const Header = () => {
	return (
		<HeaderWrapper>
			<Container>
				<HeaderPanel>
					<Link to="/">
						<Logo>Hurma RC</Logo>
					</Link>
					{Store.AuthStore.logged ? (
						<Navigation>
							<NavItem>{Store.AuthStore.name}</NavItem>
							<NavItem onClick={() => Store.AuthStore.logout()}>
								logout
							</NavItem>
						</Navigation>
					) : (
						<Link to="/signin">Sign in</Link>
					)}
				</HeaderPanel>
			</Container>
		</HeaderWrapper>
	)
}

const HeaderWrapper = styled.div`
	width: 100%;
	height: 60px;
	background: linear-gradient(90deg, #343be5 0%, #db57d9 100%);
	box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
	display: flex;
`
const HeaderPanel = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const Logo = styled.div`
	display: inline-block;
	font-size: 36px;
	font-weight: 100;
	color: #ffffff;
	align-content: center;
	cursor: pointer;
	user-select: none;
	transition: 0.2s;

	&:hover {
		transform: scale(1.1);
	}
`
const Navigation = styled.div`
	display: flex;
`
const NavItem = styled.div`
	color: #ffffff;
	font-size: 18px;
	margin-left: 10px;

	cursor: pointer;
`

export default observer(Header)
