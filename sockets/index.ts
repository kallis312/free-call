import userModel from "@/models/userModel"
import { disconnect, login } from "@Socket/authHandler"
// import { model } from "mongoose"
import { Socket } from "socket.io"

// const RecordModel = model('Record')

interface User {
  userId: string
  video: boolean
  audio: boolean
}


export default (io: any) => {

  io.on("connection", (socket: Socket) => {
    socket.emit("me", socket.id)
    socket.on('auth-login', (token: string) => login(socket, token))
    socket.on("disconnect", () => disconnect(socket))

    socket.on('c2s-call', async ({ to, userId }: { to: string, userId: string }) => {
      const toUser = await userModel.findOne({ where: { phone: to } })
      if (toUser?.id) {
        const toSocket = io.users[toUser.id]
        const fromUser = await userModel.findOne({ where: { id: userId } })
        console.log('call => ', fromUser?.id, toUser.id, toSocket)
        if (fromUser && toSocket)
          toSocket?.forEach((_s: string) => socket.to(_s).emit('s2c-call', {
            id: fromUser.id,
            name: fromUser.name,
            phone: fromUser.phone,
            email: fromUser.email,
            socketId: socket.id
          }))
      }
    })

    socket.on('c2s-accept', async ({ to, userId }: { to: string, userId: string }) => {
      const toUser = await userModel.findOne({ where: { phone: to } })
      if (toUser?.id) {
        const toSocket = io.users[toUser.id]
        const fromUser = await userModel.findOne({ where: { id: userId } })
        if (fromUser && toSocket)
          toSocket.forEach((_s: string) => socket.to(_s).emit('s2c-receive', { socketId: socket.id }))
      }
    })

    socket.on('c2s-reject', ({ to }: { to: string }) => {
      socket.to(to).emit('s2c-reject', { from: socket.id })
    })

    socket.on('c2s-init', ({ socketId }: { socketId: string }) => {
      socket.to(socketId).emit('s2c-init', { socketId: socket.id })
    })

    socket.on('c2s-signal', ({ signal, to }: { signal: any, to: string }) => {
      socket.to(to).emit('s2c-signal', { signal, from: socket.id })
    })

    socket.on('c2s-leave', ({ to }: { to: string }) => {
      console.log('leave => ', to)
      if (to)
        socket.to(to).emit('s2c-leave', { from: socket.id })
    })

    socket.on('c2s-cancel', async ({ toPhone }: { toPhone: string }) => {
      // console.log(to)
      const toUser = await userModel.findOne({ where: { phone: toPhone } })
      if (toUser?.id) {
        const toSocketIds = io.users[toUser.id]
        console.log('cancel => ', toSocketIds)
        if (toSocketIds?.length)
          toSocketIds.map((_socket: string) => {
            socket.to(_socket).emit('s2c-cancel', { from: socket.id })
          })
      }
    })

    socket.on('BE-send-message', ({ roomId, msg, sender }) => {
      io.sockets.in(roomId).emit('FE-receive-message', { msg, sender });
    });
  })

}