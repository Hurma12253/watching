import { Response } from 'express'
import { Request } from '../types'
import socket from 'socket.io'
import Message from '../models/MessageModel'
import Room from '../models/RoomModel'

class MessageController {
	private io: socket.Server
	constructor(io: socket.Server) {
		this.io = io
	}

	create = (req: Request, res: Response) => {
		try {
			const { message, room } = req.body
			const userId = req._id

			Room.findOne({ name: room }, (err, room) => {
				if (err || !room) {
					return res.status(400).json({
						message: 'This room doesnt exists!',
					})
				}

				if (room.userExists(userId)) {
					Message.create(
						{
							author: userId,
							room,
							text: message,
						},
						(err, savedMessage) => {
							if (err) {
								res.status(400).send({ message: err })
							} else {
								res.status(200).send({ message: 'Success' })
								this.io
									.to(room)
									.emit('ROOM:MESSAGE', savedMessage)
							}
						}
					)
				} else {
					res.status(400).json({message: 'You dont have permissons to write in this room!'})
				}
			})
		} catch (error) {
			res.status(400).send({ message: error })
		}
	}
}

export default MessageController
