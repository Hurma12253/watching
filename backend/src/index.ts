import express from 'express'
import { createServer } from 'http'
import createSocket from './core/socket'
import cors from 'cors'

const app = express()
const server = createServer(app)
const io = createSocket(server)

app.use(cors({ origin: '*', methods: ['*'] }))

app.get('/', (req, res) => {
	res.json('lol')
})

server.listen(process.env.PORT || 8080, () => {
	console.log(`Server is running on port ${process.env.PORT || 8080}`)
})
