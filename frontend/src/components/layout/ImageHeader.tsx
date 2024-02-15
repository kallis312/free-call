import HeaderImg from '@/assets/rsc/contacts_title_img.png'
import { FC, ReactNode } from "react"
import GoBack from './GoBack'

const ImageHeader: FC = (): ReactNode => {
  return (
    <div className="bg-[#918283] w-full flex p-2 justify-between">
      <img src={HeaderImg} alt="" width={306} />
      <GoBack />
    </div>
  )
}

export default ImageHeader