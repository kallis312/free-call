import { FC, ReactNode } from "react"
import { useNavigate } from "react-router-dom"

const GoBack: FC = (): ReactNode => {
  const navigate = useNavigate()
  const onGoBack = (): void => {
    navigate(-1)
  }
  return (
    <div>
      <img onClick={onGoBack} className="cursor-pointer min-w-[50px] min-h-[50px]" src={'/rsc/go_back_btn.png'} alt="" width={50} height={50} />
    </div>
  )
}

export default GoBack