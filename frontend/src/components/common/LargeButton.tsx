import { FC, ReactNode } from "react"
import { Link } from "react-router-dom"

type Props = {
  children: ReactNode
}

const LargeButton: FC<Props> = ({ children }): ReactNode => {
  return (
    <Link to={'/about'} className='cursor-pointer text-[50px] hover:bg-[#2bbbad] transition-colors duration-200 ease-in-out font-[hkgyokk] bg-[#ed9505] text-white h-[66px] w-[66px] shadow-md justify-center flex items-center rounded-[6px]'>{children}</Link>
  )
}

export default LargeButton