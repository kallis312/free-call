import { AppContext } from "@/context/AppProvider"
import axios from "axios"
import { FC, FormEvent, useContext, useState } from "react"
import Swal from "sweetalert2"

const FormPannel: FC = () => {
  const { user, setUser } = useContext(AppContext)
  const [email, setEmail] = useState<string>(user.email ? user.email : '')

  const onSubmit = async (e: FormEvent): Promise<void> => {
    try {
      e.preventDefault()
      if (!email.length) throw Error('Must be input email.')
      await axios.put('/user/' + user.id, { email })
      Swal.fire({
        icon: 'success',
        text: 'Successfully',
        confirmButtonText: 'はい'
      })
      setUser(prev => ({
        ...prev,
        email
      }))  
    } catch (err) {
      Swal.fire({
        icon: 'error',
        text: err instanceof Error ? err.message : 'Unknown Error.',
        confirmButtonText: 'はい'
      })
    }
  }
  return (
    user.id ?
      <>
        <div className="text-white text-lg text-center font-bold mt-2">あなたの電話番号は</div><div className="text-center bg-white text-2xl rounded-md p-2">
          {user?.phone || '-'}
        </div>
        <div className="text-white"></div>
        <div className="text-white text-lg text-center font-bold mt-2">あなたのメールアドレスは</div>
        <form onSubmit={onSubmit}>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white text-center w-full text-2xl py-2 px-4 rounded-md" />
          <div className="mt-2">
            <button type="submit" className="py-2 w-full text-2xl text-white font-bold rounded-md border-[#933c3e] border-[3px] bg-red-500">
              登録
            </button>
          </div>
        </form>
      </> :
      <div className="text-white text-lg text-center font-bold mt-2">Must be Login</div>
  )
}

export default FormPannel