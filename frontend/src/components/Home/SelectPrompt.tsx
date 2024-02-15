import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppModal from "../common/AppModal"

const SelectPrompt: FC = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onGo = (type: string): void => {
    navigate('/contacts/' + type)
  }
  return (
    <>
      <a onClick={() => setIsOpen(true)} className="cursor-pointer text-[45px] py-2 w-full flex justify-center rounded-[6px] shadow-md font-[hkgyokk] btn-green text-white">検</a>
      <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div>
          <div className="text-2xl mb-2">電話帳を表示します </div>
          <div className="flex gap-3">
            <button onClick={() => onGo('personal')}>
              <img src="/rsc/5.png" className="w-[115px] h-[60px]" />
            </button>
            <button onClick={() => onGo('company')}>
              <img src="/rsc/6.jpg" className="w-[115px] h-[60px]" />
            </button>
          </div>
          <div className="border-b border-gray-300 my-2" />
          <div className="flex gap-3">
            <button onClick={() => onGo('all')}>
              <img src="/rsc/7.jpg" className="w-[115px] h-[60px]" />
            </button>
            <button onClick={() => { setIsOpen(false) }}>
              <img src="/rsc/8.jpg" className="w-[115px] h-[60px]" />
            </button>
          </div>
        </div>
      </AppModal>
    </>
  )
}

export default SelectPrompt