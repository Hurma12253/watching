import { Response } from 'express'
import { Request } from '../types'
import socket from 'socket.io'
import Message from '../models/MessageModel'
import Room from '../models/RoomModel'
import { User } from '../models'

class MessageController {
	private io: socket.Server
	constructor(io: socket.Server) {
		this.io = io
	}

	create = (req: Request, res: Response) => {
		try {
			const { message, roomName } = req.body
			const userId = req._id

			Room.findOne({ name: roomName }, (err, room) => {
				if (err || !room) {
					return res.status(400).json({
						message: 'This room doesnt exists!',
					})
				}

				if (room.userExists(userId) || !!!room.password) {
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
								User.findOne({ _id: userId }).then((user) => {
									this.io
										.to(roomName)
										.emit('ROOM:MESSAGE', {
											text: savedMessage.text,
											author: { name: user.name },
										})
								})
							}
						}
					)
				} else {
					res.status(403).json({
						message:
							'You dont have permissons to write in this room!',
					})
				}
			})
		} catch (error) {
			res.status(400).send({ message: error })
		}
	}
}

export default MessageController
