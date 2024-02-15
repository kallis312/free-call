import GoBack from "@/components/layout/GoBack"
import { DevicePhoneMobileIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"

type Type = 'company' | 'personal'

const NewContact = () => {
  const [type, setType] = useState<Type>('personal')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')

  const onSubmit = async (): Promise<void> => {
    try {
      if (!name.length || !phone.length) throw Error('Input Field')
      await axios.post('/contacts', { contacts: [{ phone, name }], type })

      Swal.fire({
        icon: 'success',
        text: 'Contack Create Successfully.',
        confirmButtonText: 'はい'
      })
      setName('')
      setPhone('')
      // onLoadContact()
    } catch (err) {
      Swal.fire({
        icon: 'error',
        text: err instanceof Error ? err.message : 'Unknown Error.',
        confirmButtonText: 'はい'
      })
    }
  }

  return (
    <div className="container-primary">
      <div className="p-2 bg-[#918283] text-white text-lg font-[hkgyokk] flex">
        <span>
          相手の名前と電話番号と【個人用】か【会社用】かを決めて下さい。
        </span>
        <GoBack />
      </div>
      <div className="py-2 px-4 h-full bg-[#cbcbcb]">
        {/* <form> */}
        <div className="text-lg mt-3">相手氏名</div>
        <div className="flex">
          <div className="py-1 px-2 bg-[#e9ecef] rounded-l-md">
            <UserCircleIcon width={36} />
          </div>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full text-lg py-1 px-4 rounded-r-md" />
        </div>
        <div className="text-lg mt-3">電話番号</div>
        <div className="flex">
          <div className="py-1 px-2 bg-[#e9ecef] rounded-l-md">
            <DevicePhoneMobileIcon width={36} />
          </div>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full text-lg py-1 px-4 rounded-r-md" />
        </div>
        <div className="flex justify-center mt-4">
          <div onClick={() => setType('personal')} className={`text-[#198754] py-3 px-3 rounded-l-md border border-[#198754] ${type === 'personal' ? 'btn-green text-white' : ''} `}>
            <label className="flex  font-[hkgyokk] text-2xl items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"></path>
              <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
            </svg> 個人用</label>
          </div>
          <div onClick={() => setType('company')} className={`text-[#198754] py-3 px-3 rounded-r-md border border-l-0  border-[#198754]  ${type === 'company' ? 'btn-green text-white' : ''} `}>
            <label className="flex  font-[hkgyokk] text-2xl items-center gap-2" ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z"></path>
              <path d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z"></path>
            </svg> 会社用</label>
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <button onClick={onSubmit} className="btn-green font-[hkgyokk] rounded-md text-4xl text-white w-[80%] px-6 py-2">登録</button>
        </div>
        {/* </form> */}
      </div>
    </div>
  )
}

export default NewContact