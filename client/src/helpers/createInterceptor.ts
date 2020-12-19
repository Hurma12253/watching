import Store from '../store/Store'
import { AxiosInstance } from 'axios'

export function createInterceptor(
	store: typeof Store,
	axiosInstance: AxiosInstance
) {
	axiosInstance.interceptors.request.use(function (config) {
		if (store.AuthStore.token) {
			config.headers.Token = store.AuthStore.token
		}

		return config
	})

	axiosInstance.interceptors.response.use(
		function (response) {
			return response
		},
		function (error) {
			if (error.response.status === 401) {
				Store.AuthStore.logout()
            }
            
            return Promise.reject(error)
		}
	)
}
