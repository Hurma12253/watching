import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { Request } from '../types'
import config from '../../config'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.path === '/user/signin' || req.path === '/user/signup') {
		return next()
	}
	const token = req.header('Token')
	if (token) {
		try {
			const decoded: any = jwt.verify(token, config.jwt.secret)

			req._id = decoded._id 

			return next()
		} catch (error) {
			if (error instanceof jwt.TokenExpiredError) {
				return res.status(401).send({ message: 'Token expired!' })
			} else if (error instanceof jwt.JsonWebTokenError) {
				return res.status(401).send({ messahe: 'Invalid token!' })
			} else {
				res.status(400).send({message: error.message})
			}
		}
	} else {
		res.status(400).send({ message: 'Not token' })
	}
}

export default authMiddleware
