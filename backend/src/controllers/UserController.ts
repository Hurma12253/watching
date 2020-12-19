import { Response } from 'express'
import { Request } from '../types'
import socket from 'socket.io'
import User from '../models/UserModel'
import { generateToken } from '../utils/token'

class UserController {
	private io: socket.Server
	constructor(io: socket.Server) {
		this.io = io
	}

	signup = async (req: Request, res: Response) => {
		try {
			const { name, password } = req.body

			const userExists = await User.findOne({ name })

			if (userExists) {
				res.status(401).send({ message: 'This user already exists' })
			} else {
				const user = await User.create({ name, password })

				if (user) {
					res.status(200).send({
						token: generateToken({ _id: user._id }),
					})
				} else {
					res.status(400).send('Some error')
				}
			}
		} catch (error) {
			res.status(400).send({ message: error })
		}
	}

	signin = async (req: Request, res: Response) => {
		try {
			const { name, password } = req.body

			const user = await User.findOne({ name })

			if (user && user.matchPassword!(password)) {
				res.status(200).send({
					name,
					token: generateToken({ _id: user._id }),
				})
			} else if (user && !user.matchPassword!(password)) {
				res.status(401).send({ message: 'Invalid password!' })
			} else {
				res.status(400).send({ message: 'Invalid data!' })
			}
		} catch (error) {
			console.log(error)
			res.status(400).send({ message: { error } })
		}
	}

	authenticate = async (req: Request, res: Response) => {
		try {
			const user = await User.findOne({ _id: req._id })
			res.status(200).json({ name: user.name })
		} catch (error) {
			res.status(401).json({ message: 'Bad token' })
		}
	}
}

export default UserController
