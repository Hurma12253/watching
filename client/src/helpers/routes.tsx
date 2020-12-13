import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import Header from '../components/Header'
import WatchingRoom from '../components/WatchingRoom'
import WriteNameScreen from '../components/WriteNameScreen'
import Rooms from '../components/Rooms/Rooms'

interface IRoute {
	exact: boolean
	path: string
	component: any
}

const App = () => {
	const routes: IRoute[] = [
		{ exact: true, path: '/', component: WriteNameScreen },
	]
	const protectedRoutes: IRoute[] = [
		{ exact: true, path: '/', component: WriteNameScreen },
		{ exact: true, path: '/rooms', component: Rooms },
		{ exact: true, path: '/watchingroom', component: WatchingRoom },
	]
	const logged = true

	return (
		<>
			<Router>
				<Header />
                <button onClick={()=>console.log('sosi')} style={{position: 'fixed', left: 0, top: 0}}>check store</button>
				<Switch>
					{!logged
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
					<Redirect to="/404" />
				</Switch>
			</Router>
		</>
	)
}

export default App
