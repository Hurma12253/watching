import { Express, Request, Response } from 'express'
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
				res.status(400).send({ message: 'This user already exists' })
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
					token: generateToken({ _id: user._id }),
				})
			} else if (user && !user.matchPassword!(password)) {
				res.status(400).send({ message: 'Invalid password!' })
			} else {
				res.status(400).send({ message: 'Invalid data!' })
			}
		} catch (error) {
			console.log(error)
			res.status(400).send({ message: { error } })
		}
	}
}

export default UserController
