import { FC, ReactNode, useEffect, useState } from "react"
import './index.scss'
import GoBack from "@/components/layout/GoBack"

const levelArr: string[] = [
  'bt-0',
  'bt-10',
  'bt-20',
  'bt-40',
  'bt-60',
  'bt-80',
  'bt-100'
]

const Battery: FC = (): ReactNode => {
  const [index, setIndex] = useState<number>(0)
  const [level, setLevel] = useState<number>(0)


  useEffect(() => {
    if ('getBattery' in navigator) {
      // Battery Status API is supported
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigator.getBattery().then((battery) => {
        // Use the battery object to get the charging percentage
        updateBatteryStatus(battery.level * 100);

        // Listen for changes in battery status
        battery.addEventListener('levelchange', function () {
          updateBatteryStatus(battery.level * 100);
        });
      });
    } else {
      // Battery Status API is not supported
      console.log("Battery Status API is not supported in this browser.");
    }
  }, [])


  const updateBatteryStatus = (per: number): void => {
    setLevel(per)
    if (per >= 85) setIndex(6)
    else if (per >= 60) setIndex(5)
    else if (per >= 50) setIndex(4)
    else if (per >= 35) setIndex(3)
    else if (per >= 20) setIndex(2)
    else if (per >= 10) setIndex(1)
    else setIndex(0)
  }

  return (
    <div className="container-primary">
      <div className="p-2 flex justify-end">
        <GoBack />
      </div>
      <div className="flex flex-col justify-center p-8 h-full overflow-auto items-center">
        <div className="text-4xl ">充電残量</div>
        <div className="text-3xl my-2">{level}%</div>
        <div className="h-full flex flex-col items-center justify-center">
          <div className={`${levelArr[index]}`} />
        </div>
        <div className="text-2xl my-1">当社のメールアドレスです</div>
        <div className="text-2xl my-1">jo-ene.123@jacos.co.jp</div>
        <div className="text-2xl text-center my-1">ご意見、ご要望はお気軽におよせ下さい</div>
        <button className="px-4 py-2 bg-gray-400 rounded-md text-2xl text-white">問い合わせ</button>
        <div className="text-2xl my-1">上記ボタンからメールが送れます</div>
      </div>
    </div>
  )
}

export default Battery