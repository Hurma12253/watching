import { Request as Req} from 'express'

// declare module 'express' {
// 	export interface Request {
// 		user: {
// 			id: string
// 		}
// 	}
// }

export interface Request extends Req {
	_id: string
}

