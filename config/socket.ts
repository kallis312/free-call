import socket from '@Socket/index'

export let io: any = null

export type SocketUser = {
  _id: string,
  socket: string
}

export default (app: any) => {
  const socketIO = require("socket.io")(app, {
    cors: {
      methods: ["GET", "POST"]
    }
  })
  io = socketIO
  io.users = {}
  io.socketToUser = {}

  socket()
  return socketIO
}