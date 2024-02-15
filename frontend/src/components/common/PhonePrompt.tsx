import { AppContext, User } from '@/context/AppProvider';
import axios from 'axios';
import { FC, FormEvent, ReactNode, useContext, useRef } from 'react';
import Swal from 'sweetalert2';
import AppModal, { ModalProps } from './AppModal';
import socket from '@/context/socket';

const PhonePrompt: FC<ModalProps> = (props): ReactNode => {
  const { setUser } = useContext(AppContext)
  const phoneRef = useRef<HTMLInputElement>(null)
  const onSubmit = async (e: FormEvent): Promise<void> => {
    try {
      e.preventDefault()
      const phone = phoneRef.current?.value
      if (phone?.length) {
        const { data } = await axios.post<User>('/user', { phone: phone })
        console.log(data)

        socket.emit('auth-login', data.token)
        if (data.token)
          localStorage.setItem('token', data.token)
        setUser(data)
        axios.defaults.headers.common['Authorization'] = data.token
        props.setIsOpen(false)
      }
      else
        throw Error('Input Phone')
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Unknown Error.'
      Swal.fire({
        icon: 'error',
        text: errMsg,
        confirmButtonText: 'はい'
      })
    }
  }

  return (
    <AppModal {...props}>
      <div>あなたの電話番号でログインしてくださ い。</div>
      <form className="mt-3 flex flex-col" onSubmit={onSubmit}>
        <input ref={phoneRef} className=" text-4xl outline-none border-b border-gray-300 " type="tel" required />
        <div className="flex gap-2 justify-end">
          <button onClick={() => props.setIsOpen(false)} className="mt-3 text-white rounded-md bg-red-600 py-3 px-6 shadow-lg hover:bg-red-700" >戻る</button>
          <button className="mt-3 text-white rounded-md bg-green-600 py-3 px-6 shadow-lg hover:bg-green-700 " type="submit">完了</button>
        </div>
      </form>
    </AppModal>
  )
}

export default PhonePrompt