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

	comein = async (req: Request, res: Response) => {
		try {
			const { name, password } = req.body

			const roomExists = await Room.findOne({ name })

			if (!roomExists) {
				res.status(400).send({ message: 'This room doesnt exists!' })
			} else {
				if (roomExists && roomExists.matchPassword!(password)) {
					if(!roomExists.userExists(req._id)){
						roomExists.users.push({_id: req._id})
						await roomExists.save()
					}

					const messages = await Message.find({
						room: roomExists._id,
					})
					res.status(200).send({ messages })
				} else {
					res.status(400).send({ message: 'Invalid data' })
				}
			}
		} catch (error) {
			res.status(400).send({ message: error })
		}
	}
}

export default RoomController
