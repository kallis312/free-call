import { Contact } from "@/types/define"
import axios from "axios"
import socket from "@/context/socket"
import { FC, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import Peer from 'simple-peer'
import { useGlobalAudioPlayer } from 'react-use-audio-player'

import { AppContext } from "@/context/AppProvider"

const ps: { [key: string]: Peer.Instance } = {}

let stream: MediaStream
let userSocketId: string

const Calling: FC = () => {
  const navigate = useNavigate()
  const { load, stop } = useGlobalAudioPlayer()
  const { user, setCalling } = useContext(AppContext)
  const [connect, setConnect] = useState<number>(0)
  const { phone, type } = useParams()
  const [userInfo, setUserInfo] = useState<Contact>()
  useEffect(() => {
    setCalling(true)
    if (!phone || phone === 'null') {
      Swal.fire({
        icon: 'error',
        text: 'PhoneNumber Error.',
        confirmButtonText: 'はい',
        didClose: () => {
          navigate(-1)
        }
      })
    } else {
      getUserInfo(phone)
      socketInit()
    }
    return () => {
      if (stream)
        stream.getTracks().forEach(track => {
          track.stop()
        })
      socketDestroy()
      stop()
      setCalling(false)
    }
  }, [phone])


  const socketInit = async () => {
    try {
      if (import.meta.env.MODE === 'development')
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
      else
        stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      if (type === 'send') {
        load('/sounds/ringing.mp3', { autoplay: true, loop: true })
        socket.emit('c2s-call', { to: phone, userId: user?.id })
        socket.on('s2c-receive', ({ socketId }: { socketId: string }) => {
          stop()
          console.log('Reived: ' + socketId)
          addPeer({ socketId, stream, initiator: true })
        })
        socket.on('s2c-reject', () => {
          load('/sounds/beep.wav', { autoplay: true, loop: true })
          setConnect(2)
        })
      }
      else if (type === 'receive') {
        socket.emit('c2s-accept', { to: phone, userId: user?.id })
      }

      socket.on('s2c-init', ({ socketId }: { socketId: string }) => {
        addPeer({ socketId, initiator: false, stream })
        console.log('Join Add Peer:' + socketId)
      })

      socket.on('s2c-leave', ({ from }: { from: string }) => {
        console.log('Leave => ', from)
        load('/sounds/beep.wav', { autoplay: true, loop: true })
        setConnect(2)
        // ps[from].destroy()
      })

      socket.on('s2c-signal', ({ signal, from }: { signal: Peer.SignalData, from: string }) => {
        userSocketId = from
        console.log('Signal recieved: ', { from, signal })
        if (!ps[from])
          addPeer({ socketId: from, stream, initiator: false })
        ps[from].signal(signal)
        setConnect(1)
      })
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : err
      Swal.fire({
        icon: 'error',
        text: errMsg as string,
        confirmButtonText: 'はい',
        didClose: () => {
          navigate(-1)
        }
      })
    }
  }

  const socketDestroy = () => {
    if (userSocketId && !ps[userSocketId].destroyed) {
      // ps[userSocketId].destroy()
      console.log(userSocketId, 'destroyed.')
    }
    console.log(userInfo)
    if (userSocketId)
      socket.emit('c2s-leave', { to: userSocketId })
    // console.log(connect)
    if (connect === 0)
      socket.emit('c2s-cancel', { toPhone: phone })
    socket.off('s2c-receive')
    socket.off('s2c-reject')
    socket.off('s2c-leave')
  }

  const addPeer = ({ socketId, initiator, stream }: { socketId: string | undefined, initiator: boolean, stream: MediaStream | undefined }): void => {
    if (socketId) {
      ps[socketId] = new Peer({
        initiator,
        trickle: false,
        stream,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' },
          ]
        }
        // config: configuration
      })
      ps[socketId].on('close', () => {
        // ps[socketId].destroy()
        console.log(socketId, 'destroyed.')
      })
      ps[socketId].on('connect', () => {
        console.log('Peer connected:', socketId)
      })
      console.log('Adding peer : ', { socketId })
      ps[socketId].on('signal', (data: Peer.SignalData) => {
        console.log('Signal : ', { socketId, initiator, data, stream })
        socket.emit('c2s-signal', { signal: data, to: socketId })
      })
      ps[socketId].on('stream', (data: MediaStream) => {
        console.log('Received Stream : ', { data })
        const vidoes = document.getElementById('videos')
        const newVid = document.createElement('audio')
        newVid.srcObject = data!
        newVid.id = socketId
        // newVid.width = 400
        // newVid.onclick = expandScreen
        // newVid.height = 300
        newVid.autoplay = true
        vidoes?.appendChild(newVid)
      })
      // setPeers(ps)
    }
  }

  const getUserInfo = async (phone: string): Promise<void> => {
    try {
      const { data } = await axios.get<Contact>('/contacts/' + phone)
      setUserInfo(data)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : err
      Swal.fire({
        icon: 'error',
        text: errorMsg as string,
        confirmButtonText: 'はい'
      })
    }
  }

  return (
    <div className="container-primary">
      <div className="bg-[#AA8899] p-4">
        <div className="flex justify-center">
          <img src='/rsc/call_pic.jpg' className="w-28 h-2w-28 rounded-full" alt="" />
        </div>
        <div className="text-white text-2xl mt-4 text-center">
          {connect === 0 ? <span>接続中です。<br /> お待ち下さい。</span> : connect === 1 ? 'Connect' : 'disconnect'}
        </div>
      </div>
      <div className="h-full flex items-center justify-center flex-col text-gray-600">
        <div className="text-2xl font-bold">{userInfo?.name}</div>
        <div className="text-3xl">{phone}</div>
        <div className="text-2xl">{userInfo?.email}</div>
        <div className="text-2xl capitalize">{userInfo?.type}</div>
        <div id="videos"></div>
      </div>
      <div className="bg-[#AA8899] p-8 flex flex-col justify-center">
        {/* <div className="flex justify-center">
          <button className="bg-orange-400 px-8 py-2 rounded-full shadow-lg text-white font-bold">スピーカー OFF</button>
        </div> */}
        <div className="flex justify-center mt-8">
          <button onClick={() => {
            navigate(-1)
          }} className="red-grad-bg px-8 py-2 w-full text-2xl rounded-md shadow-lg text-white font-bold"> 終了</button>
        </div>
      </div>
    </div>
  )
}

export default Calling