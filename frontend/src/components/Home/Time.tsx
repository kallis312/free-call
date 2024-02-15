import { FC, useEffect, useState } from "react"

const Time: FC = () => {
  const [time, setTime] = useState<Date>(new Date())
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 3000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div className="flex flex-col text-white font-sans">
      <div className="text-[50px] font-bold leading-[50px]">{time.getHours()}:{time.getMinutes()}</div>
      <div className="text-[34px]">{time.getFullYear()}.{time.getMonth() + 1}.{time.getDate()}</div>
    </div>
  )
}

export default Time