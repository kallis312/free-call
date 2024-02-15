import { FC, ReactNode } from "react"
import GoBack from "./GoBack"

const NormalHeader: FC = (): ReactNode => {
  return (
    <div className="p-2 flex justify-end bg-[#918283]">
      <GoBack />
    </div>
  )
}

export default NormalHeader