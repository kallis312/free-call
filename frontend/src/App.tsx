import '@/App.scss';
import { AppContext, User } from '@/context/AppProvider';
import socket from '@/context/socket';
import axios from 'axios';
import { Suspense, lazy, useContext, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import Swal from 'sweetalert2';

const Battery = lazy(() => import('@/pages/Battery'))
const FreeCall = lazy(() => import('@/pages/FreeCall'))
const Home = lazy(() => import('@/pages/Home'))
const Calling = lazy(() => import('@/pages/Calling'))
const Contacts = lazy(() => import('@/pages/Contacts'))
const Setting = lazy(() => import('@/pages/Setting'))
const OutGoing = lazy(() => import('@/pages/OutGoing'))
const History = lazy(() => import('@/pages/History'))
const About = lazy(() => import('@/pages/About'))
const NewContact = lazy(() => import('@/pages/NewContact'))

const Loading: React.FC = () => {
  return (
    <div className='flex justify-center items-center w-full'>
      <div className="animate-spin inline-block w-24 h-24 border-[3px] border-current border-t-transparent text-green-600 rounded-full dark:text-green-500" role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

const App: React.FC = () => {
  const navigate = useNavigate()
  const { load, stop } = useGlobalAudioPlayer()
  const { user, setUser } = useContext(AppContext)

  useEffect(() => {
    socket.on('connect', () => {
      if (user?.token) {
        userInit()
      }
    })
  }, [])


  const userInit = async () => {
    try {
      const { data } = await axios.post<User>('/user/token')
      setUser(data)
      socket.emit('auth-login', data.token)
      socket.on('s2c-call', async (data): Promise<void> => {
        socket.on('s2c-cancel', () => {
          Swal.close()
        })
        load('/sounds/baby.mp3', { autoplay: true, loop: true })
        const { isConfirmed } = await Swal.fire({
          icon: 'question',
          text: 'Call from ' + (data.name || data.phone),
          showCancelButton: true,
          confirmButtonText: 'Accept',
          cancelButtonText: 'Reject',
        })
        stop()
        socket.off('s2c-cancel')
        if (isConfirmed)
          navigate('/calling/receive/' + data.phone)
        else
          socket.emit('c2s-reject', { to: data.socketId })
      })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        text: err instanceof Error ? err.message : 'Unknown Error.',
        confirmButtonText: 'はい'
      })
    }
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/' element={user?.token ? <Outlet /> : <Navigate replace to="/" />} >
            <Route path='/calling/:type/:phone' element={<Calling />} />
            <Route path='/free-call' element={<FreeCall />} />
            <Route path='/battery' element={<Battery />} />
            <Route path='/about' element={<About />} />
            <Route path='/history' element={<History />} />
            <Route path='/setting' element={<Setting />} />
            <Route path='/new-contact' element={<NewContact />} />
            <Route path='/out-going' element={<OutGoing />} />
            <Route path='/contacts/:type' element={<Contacts />} />
          </Route>
        </Routes>
      </Suspense>

      <ToastContainer />
    </>
  )
}

export default App


