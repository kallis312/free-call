import ImageHeader from "@/components/layout/ImageHeader";
import { Contact } from "@/types/define";
import axios from "axios";
import { FC, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const FreeCall: FC = (): ReactNode => {
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    loadContact('all')
  }, [])

  const loadContact = async (type: string): Promise<void> => {
    try {
      const { data } = await axios.get<Contact[]>('/contacts', { params: { type } })
      setContacts(data)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Unknown Error.')
    }
  }

  return (
    <>
      <div className="bg-primary w-full h-full flex flex-col overflow-auto">
        <ImageHeader />
        <div className="p-2 border-b border-solid border-gray-300 flex justify-between items-end">
          <div className="text-red-400 text-xs">連絡先リストが空です</div>
          {/* <button onClick={onLoadContact} className="bg-[#00B050] py-1 px-2 shadow-md text-white">
            連絡先をロード
          </button> */}
        </div>
        <div className="h-full mt-1 overflow-auto flex flex-col">
          {
            contacts.map((_, i) => (
              <Link to={'/calling/send/' + _.phone} key={i}>
                <div className="border-b p-2 border-gray-300 rounded-sm">
                  <div>{_.name || 'Unknown User'}</div>
                  <div className="text-lg">{_.phone || "No Phone Number"}</div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default FreeCall