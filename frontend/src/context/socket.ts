import { createContext } from 'react';
import { io, Socket } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SEVER_URL

console.log(socketUrl)

export const socket = io(socketUrl, {
  transports: ['websocket']
});

export const SocketContext = createContext<Socket>(socket);

export default socket