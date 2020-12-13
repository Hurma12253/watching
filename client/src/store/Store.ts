import { makeAutoObservable } from 'mobx'
import Api from '../Services/Api'

class Store {
	constructor() {
		makeAutoObservable(this)
	}
}

export default Store
