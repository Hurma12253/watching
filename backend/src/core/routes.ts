import { Express } from 'express'
import socket from 'socket.io'
import { UserCtrl, RoomCtrl, MessageCtrl } from '../controllers'
import authMiddleware from '../middlewares/authMiddleware'

export function createRoutes(app: Express, io: socket.Server) {
	const UserController = new UserCtrl(io)
	const RoomController = new RoomCtrl(io)
	const MessageController = new MessageCtrl(io)

	app.post('/user/signup', UserController.signup)
	app.post('/user/signin', UserController.signin)
	app.get('/user/authenticate', authMiddleware, UserController.authenticate)

	app.post('/room/create', RoomController.create)
	app.post('/room/comein', authMiddleware, RoomController.comein)
	app.post('/room/checkpassword',authMiddleware, RoomController.checkpassword)
	app.get('/rooms', authMiddleware, RoomController.index)

	app.post('/message/create', authMiddleware, MessageController.create)
}
