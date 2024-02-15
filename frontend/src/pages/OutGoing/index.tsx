import FormPannel from "@/components/OutGoing/FormPannel";
import GoBack from "@/components/layout/GoBack";
import { FC, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

const numberArray: Array<string | number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#']

const OutGoing: FC = (): ReactNode => {
  const navigate = useNavigate()
  const [number, setNumber] = useState<string>('')
  return (
    <div className="home-bg flex w-full h-full flex-col">
      <div className="p-2 flex justify-end">
        <GoBack />
      </div>
      <div className="px-4 overflow-auto pb-4">
        <div className="border-b border-gray-300 h-[57px] text-white text-4xl py-2 px-4">
          {number}
        </div>
        <div className="grid grid-cols-3 gap-6 mt-4 px-4">
          {
            numberArray.map((_, idx) => (
              <button className="relative" key={idx} onClick={() => setNumber(pre => pre + _)}>
                <img src="/rsc/1.png" />
                <span className="absolute top-0 left-0 flex justify-center items-center w-full h-full text-4xl text-white">{_}</span>
              </button>
            ))
          }
        </div>
        <div className="flex gap-2 mt-4">
          <button>
            <img src="/rsc/2.png" alt="" />
          </button>
          <button onClick={() => setNumber(pre => pre.slice(0, -1))}>
            <img src="/rsc/3.png" alt="" />
          </button>
        </div>
        <div className="mt-2">
          <button onClick={() => { if (number.length) navigate('/calling/send/' + number) }} className="py-2 w-full text-2xl text-white font-bold rounded-md border-[#933c3e] border-[3px] red-grad-bg">
            無料通話
          </button>
        </div>
        <div className="my-2 border-b border-gray-300" />
        <FormPannel />
      </div>
    </div>
  )
}

export default OutGoing