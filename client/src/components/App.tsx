import React, { useEffect } from 'react'
import Store from '../store/Store'
import useRoutes from '../helpers/routes'

const App = () => {
	useEffect(() => {
		Store.authenticate()
	}, [])

	return useRoutes()
}

export default App
