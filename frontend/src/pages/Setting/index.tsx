import GoBack from "@/components/layout/GoBack";
import { FC, ReactNode } from "react";

const Setting: FC = (): ReactNode => {
  return (
    <div className="home-bg w-full h-full flex flex-col">
      <div className="p-2 flex justify-end">
        <GoBack />
      </div>
      <div className="px-4">
        <div className="text-3xl text-center">着信<small>音量</small></div>
        <div className="flex gap-6">
          <button>
            <img src="/rsc/s-6.png" />
          </button>
          <button>
            <img src="/rsc/s-7.png" />
          </button>
          <button>
            <img src="/rsc/s-8.png" />
          </button>
        </div>
        <div className="text-center text-white text-lg mt-2">音量は「<span className="font-bold text-yellow-500">大</span>」に設定しました</div>
        <div className="flex items-center justify-between">
          <div>着信音 (マナー)</div>
          <button>
            <img className="w-[185px] h-[55px]" src="/rsc/s-4.png" />
          </button>
        </div>
        <div className="text-center text-white text-lg mt-2">着信音を出します</div>
        <div className="flex items-center justify-between">
          <div>振動 (バイブ)</div>
          <button>
            <img className="w-[185px] h-[55px]" src="/rsc/s-5.png" />
          </button>
        </div>
        <div className="text-center text-white text-lg mt-2">バイブを「入」にしました </div>
        <div className="text-3xl text-center mt-2">通話 <small>音量</small></div>
        <div className="flex gap-6">
          <button>
            <img src="/rsc/s-6.png" />
          </button>
          <button>
            <img src="/rsc/s-7.png" />
          </button>
          <button>
            <img src="/rsc/s-8.png" />
          </button>
        </div>
        <div className="text-center text-white text-lg mt-2">音量は「<span className="font-bold text-yellow-500">大</span>」に設定しました </div>
        <div className="text-3xl mt-2">ボタン反応速度</div>
        <div className="flex gap-6">
          <button>
            <img src="/rsc/s-9.png" />
          </button>
          <button>
            <img src="/rsc/s-10.png" />
          </button>
          <button>
            <img src="/rsc/s-11.png" />
          </button>
        </div>
        <div className="text-center text-white text-lg mt-2">音量は「<span className="font-bold text-yellow-500">中</span>」に設定しました </div>
        <div className="text-3xl mt-2 text-center">電源スリープ</div>
        <div className="flex gap-4 mt-2">
          <button className="h-[74px] w-full bg-gray-300 rounded-md text-2xl">
            30<br />秒
          </button>
          <button className="h-[74px] w-full bg-gray-300 rounded-md text-2xl">
            1<br />分
          </button>
          <button className="h-[74px] w-full bg-gray-300 rounded-md text-2xl">
            2<br />分
          </button>
          <button className="h-[74px] w-full bg-gray-300 rounded-md text-2xl">
            3<br />分
          </button>
        </div>
      </div>
    </div>
  )
}

export default Setting