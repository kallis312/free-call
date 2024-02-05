import { SocketUser, io } from "@Conf/socket"

export const getUserSockets = (uIds: string[]) => {
  const sockets: SocketUser[] = [...io.users]
  const setA = new Set(uIds)
  const specialItems = sockets.filter(socket => {
    return setA.has(socket._id)
  })
  return specialItems
}