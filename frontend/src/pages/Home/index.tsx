import ButtomImg from '@/assets/rsc/applist_btn.png'
// import LargeButton from '@/components/common/LargeButton'
import SelectPrompt from '@/components/Home/SelectPrompt'
import PhonePrompt from '@/components/common/PhonePrompt'
import { AppContext } from '@/context/AppProvider'
import { FC, ReactNode, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './home.scss'
import Time from '@/components/Home/Time'
import Swal from 'sweetalert2'
import socket from '@/context/socket'

const Home: FC = (): ReactNode => {
  const { user, setUser } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!user?.token) setIsOpen(true)
  }, [])

  const logOut = async (): Promise<void> => {
    try {
      if (user.token) {
        const { isConfirmed } = await Swal.fire({
          icon: 'error',
          text: 'Do you want delete?',
          confirmButtonText: 'はい',
          showCancelButton: true,
          cancelButtonText: 'Cancel'
        })
        if (isConfirmed) {
          socket.emit('auth-logout')
          setUser({})
          localStorage.clear()
          Swal.fire({
            icon: 'success',
            text: 'Logout Successfully.',
            confirmButtonText: 'はい'
          })
        }
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        text: err instanceof Error ? err.message : 'Unknown Error.',
        confirmButtonText: 'はい'
      })
    }
  }

  return (
    <div className="p-4 w-full home-bg overflow-auto">
      <PhonePrompt isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex justify-between">
        <Time />
        {/* <LargeButton>初</LargeButton> */}
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/free-call" className="ripple-effect text-[45px] leading-[52px] py-1 w-[80%] text-center rounded-[6px] shadow-md font-[hkgyokk] btn-green text-white">無料通話</Link>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-6">
        <Link to="/contacts/personal" className="text-[45px] py-2 w-full flex justify-center rounded-[6px] shadow-md font-[hkgyokk] btn-green text-white">個</Link>
        <Link to="/contacts/company" className="text-[45px] py-2 w-full flex justify-center rounded-[6px] shadow-md font-[hkgyokk] btn-green text-white">会</Link>
        <Link to="/out-going" className="text-[45px] py-2 w-full flex justify-center rounded-[6px] shadow-md font-[hkgyokk] btn-green text-white">発</Link>
        <Link to="/history" className="text-[45px] py-2 w-full flex justify-center rounded-[6px] shadow-md font-[hkgyokk] btn-green text-white">歴</Link>
        <Link to="/new-contact" className="text-[45px] py-2 w-full flex justify-center rounded-[6px] shadow-md font-[hkgyokk] btn-green text-white">新</Link>
        <SelectPrompt />
        <Link to="/setting" className="text-[45px] py-2 w-full flex justify-center rounded-[6px] shadow-md font-[hkgyokk] btn-green text-white">設</Link>
        <Link to="/battery" className="text-[45px] py-2 w-full flex justify-center rounded-[6px] shadow-md font-[hkgyokk] btn-green text-white">電</Link>
      </div>
      <div className="cursor-pointer w-[90%] text-center text-lg bg-[#D7E4BD] rounded-[25px] p-4 border-green-700 border-[3px] mx-auto mt-6 border-solid">
        各ボタンを長押し<br />
        するとナビを表示します
      </div>
      <div className="flex h-[78px] gap-2 mt-4">
        <a className="cursor-pointer text-white text-lg h-full w-full bg-[#80B4C2] shadow-md flex justify-center items-center rounded-lg">留守</a>
        <a className="cursor-pointer text-white text-lg h-full w-full bg-[#80B4C2] shadow-md flex justify-center items-center rounded-lg">不在</a>
        <a onClick={logOut} className="cursor-pointer text-white text-lg h-full w-full bg-[#80B4C2] shadow-md flex justify-center items-center rounded-lg">終了</a>
      </div>
      <div className="flex gap-3 mt-4 pb-4 justify-center">
        <a><img src={ButtomImg} width={72} /></a>
        <a className="cursor-pointer text-white text-lg px-4 bg-[#3A4AA6] shadow-md flex justify-center items-center rounded-lg">待ち受け画面</a>
      </div>
    </div>
  )
}

export default Home