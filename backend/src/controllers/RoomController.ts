import { Express, Response } from 'express'
import { Request } from '../types'
import socket from 'socket.io'
import Room from '../models/RoomModel'
import Message from '../models/MessageModel'

class RoomController {
	private io: socket.Server
	constructor(io: socket.Server) {
		this.io = io
	}

	index = async (req: Request, res: Response) => {
		try {
			const rooms = await Room.find({})

			if (rooms) {
				res.status(200).send(
					rooms.map((el) => ({
						name: el.name,
						locked: el.users.reduce(
							(acc, el) => (el._id == req._id ? true : acc),
							false
						)
							? false
							: !!el.password,
					}))
				)
			} else {
				res.status(400).send({ message: 'Some error!' })
			}
		} catch (error) {
			res.status(400).send({ message: error })
		}
	}

	create = async (req: Request, res: Response) => {
		try {
			const { name, password } = req.body
			const roomExists = await Room.findOne({ name })

			if (roomExists) {
				res.status(200).send({ message: 'This room already exists!' })
			} else {
				const room = password
					? await Room.create({ name, password })
					: await Room.create({ name })

				if (room) {
					res.status(200).send({ message: 'Success' })
				} else {
					res.status(400).send({ message: 'Some error' })
				}
			}
		} catch (error) {
			res.status(400).send({ message: error })
		}
	}

	comein = (req: Request, res: Response) => {
		try {
			const { name } = req.body

			Room.findOne({ name }).then((roomExists) => {
				if (!roomExists) {
					res.status(400).send({
						message: 'This room doesnt exists!',
					})
				} else {
					if (!roomExists.userExists(req._id) && !!roomExists.password) {
						return res
							.status(403)
							.send({ message: 'You dont have permissions!' })
					}

					Message.find({
						room: roomExists._id,
					})
						.populate('author', 'name')
						.then((messages) => {
							res.status(200).send({
								name: roomExists.name,
								messages,
							})
						})
				}
			})
		} catch (error) {
			res.status(400).send({ message: error })
		}
	}

	checkpassword = (req: Request, res: Response) => {
		const { name, password } = req.body
		const userId = req._id

		Room.findOne({ name }).then((room) => {
			if (room && room.matchPassword(password)) {
				if (room.userExists(userId)) {
					res.status(200).send({ message: 'Success' })
				} else {
					room.users.push({ _id: userId })
					room.save()
						.then((room) => {
							if (room) {
								res.status(200).send({ message: 'Success' })
							}
						})
						.catch((err) =>
							res.status(400).send({ message: 'Some error' })
						)
				}
			} else {
				res.status(400).send({ message: 'Invalid credentials!' })
			}
		})
	}
}

export default RoomController
