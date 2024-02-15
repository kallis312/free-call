import NormalHeader from "@/components/layout/NormalHeader";
import { FC, ReactNode } from "react";


const History: FC = (): ReactNode => {
  return (
    <div className="container-primary">
      <NormalHeader />
      <div className="w-full border-b border-gray-300"></div>
      <div className="h-full overflow-auto flex flex-col mt-1 p-1 gap-1">
        {/* {
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="border-b border-gray-300 p-1">
              <div>truepartner312</div>
              <div>truepartner312</div>
            </div>
          ))
        } */}
      </div>
    </div>
  )
}

export default History