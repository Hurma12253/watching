import express from 'express'
import { createServer } from 'http'
import createSocket from './core/socket'
import { createRoutes } from './core/routes'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const server = createServer(app)
const io = createSocket(server)

app.use(cors({ origin: '*', methods: ['*'] }))
app.use(express.json())

createRoutes(app, io)

app.get('/', (req, res) => {
	res.json('lol')
})

const start = async () => {
	try {
		await mongoose.connect(process.env.mongoUri || 'pizdec', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
		server.listen(process.env.PORT || 8080, () => {
			console.log(`Server is running on port ${process.env.PORT || 8080}`)
		})
	} catch (error) {
		console.log(error)
		process.exit()
	}
}

start()
