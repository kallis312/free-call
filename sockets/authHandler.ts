import { io } from "@Conf/socket";
import { decode } from 'jsonwebtoken';

const maximum = process.env.MAXIMUM || 4;

export const login = (socket: any, token: string) => {
  const jwt = token.split(' ')[1]
  const user: any = decode(jwt)
  if (!io.users[user.id]?.some((_: string) => _ === socket.id))
    io.users[user.id] = [...(io.users[user.id] || []), socket.id]
  io.socketToUser[socket.id] = user.id
  console.log('login -> ', io.users)
}

export const disconnect = (socket: any) => {
  const userId = io.socketToUser[socket.id]
  if (userId) {
    const index = io.users[userId].findIndex((x: string) => x === socket.id)
    if (index > -1) {
      io.users[userId].splice(index, 1)
      if (!io.users[userId].length)
        delete io.users[userId]
    }
    delete io.socketToUser[socket.id]
    socket.broadcast.emit("callEnded")
  }
}
