import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Store from '../store/Store'
import Api from '../Services/Api'
import { useRoutes } from '../helpers/routes'
import { createInterceptor } from '../helpers/createInterceptor'
import Header from './Header'

const App = () => {
	useEffect(() => {
		createInterceptor(Store, Api.api)
		Store.AuthStore.authenticate()
	}, [])

	return (
		<Router>
			<Header />
			<button
				onClick={() => console.log(Store)}
				style={{ position: 'fixed', left: 0, top: 0 }}
			>
				check store
			</button>
			{useRoutes(Store.AuthStore.logged)}
		</Router>
	)
}

export default observer(App)
