import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import WatchingRoom from '../components/WatchingRoom'
import WriteNameScreen from '../components/WriteNameScreen'
import Rooms from '../components/Rooms/Rooms'

interface IRoute {
	exact: boolean
	path: string
	component: any
}

export const useRoutes = (isAuth: boolean) => {
	const routes: IRoute[] = [
		{ exact: true, path: '/', component: WriteNameScreen },
	]
	const protectedRoutes: IRoute[] = [
		{ exact: true, path: '/', component: Rooms },
		{ exact: true, path: '/rooms', component: Rooms },
		{ exact: true, path: '/watchingroom', component: WatchingRoom },
	]

	return (
		<Switch>
			{!isAuth
				? routes.map((el) => (
						<Route
							key={el.path}
							exact={el.exact}
							path={el.path}
							component={el.component}
						/>
				  ))
				: protectedRoutes.map((el) => (
						<Route
							key={el.path}
							exact={el.exact}
							path={el.path}
							component={el.component}
						/>
				  ))}
			<Route path="/404" render={() => <h1>Not found!</h1>} />
			<Redirect to="/" />
		</Switch>
	)
}
