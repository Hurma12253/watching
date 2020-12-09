import socket from 'socket.io'
import http from 'http'

export default (http: http.Server) => {
    const io = new socket.Server(http)

    io.on('connection',(socket: any)=>{
        socket.on('DIALOG:JOIN',(name: string, dialogId: string)=>{
            socket.join(dialogId)
            socket.dialogId = dialogId
            socket.name = name
            console.log(`${socket.name} joined the ${dialogId}`,)
            socket.to(dialogId).emit("DIALOG:JOINED",`${name} joined the ${dialogId}`)
        })

        socket.on("DIALOG:MESSAGE",(message: string)=>{
            console.log(message)
            io.to(socket.dialogId).emit("DIALOG:MESSAGE",message, socket.name)
        })

        socket.on('disconnect',(reason: string)=>{
            console.log(`${socket.name} left the ${socket.dialogId}`)
            io.to(socket.dialogId).emit("DIALOG:LEFTED",`${socket.name} left the ${socket.dialogId}`)
        })
    })

    return io
}