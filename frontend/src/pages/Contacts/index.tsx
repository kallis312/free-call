import ActionPrompt from "@/components/Contacts/ActionPrompt";
import ImageHeader from "@/components/layout/ImageHeader";
import { Contact } from "@/types/define";
import axios from "axios";

import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

type IContact = {
  name: string[],
  tel: string[],
  email: string[]
}

interface Navigator {
  contacts: {
    select(properties: string[], options?: unknown): Promise<IContact[]>
  }
}

const contactSupported = 'contacts' in navigator

const Contacts: FC = (): ReactNode => {
  const { type } = useParams()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const selContact = useRef<Contact>()

  useEffect(() => {
    if (type)
      loadContact(type)
    else
      throw Error('Type Error.')
  }, [type])

  const loadContact = async (type: string): Promise<void> => {
    try {
      const { data } = await axios.get<Contact[]>('/contacts', { params: { type } })
      setContacts(data)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        text: err instanceof Error ? err.message : 'Unknown Error.',
        confirmButtonText: 'はい'
      })
    }
  }

  const onLoadContact = async (): Promise<void> => {
    try {
      if (contactSupported && type) {
        const contacts = await (navigator as unknown as Navigator).contacts.select(['name', 'email', 'tel'], { multiple: true })
        const temp: {
          phone: string | null
          email: string | null
          name: string | null
        }[] = []
        Swal.fire({
          text: JSON.stringify(contacts)
        })
        contacts.forEach(_contact => {
          if (_contact.tel?.length && _contact.tel[0])
            temp.push({
              email: _contact.email.length ? _contact.email[0] : null,
              name: _contact.name.length ? _contact.name[0] : null,
              phone: _contact.tel[0]
            })
        })
        if (temp.length) {
          await axios.post('/contacts', { contacts: temp, type: type })
          loadContact(type)
        }
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        text: err instanceof Error ? err.message : 'Unknown Error.',
        confirmButtonText: 'はい'
      })
    }
  }

  const onContactClick = (contact: Contact): void => {
    selContact.current = contact
    setIsOpen(true)
  }

  return (
    <>
      <div className="bg-primary w-full h-full flex flex-col overflow-auto">
        <ImageHeader />
        <div className="p-2 border-b border-solid border-gray-300 flex justify-between items-end">
          <div className="text-red-400 text-xs">連絡先リストが空です</div>
          {
            type !== 'all' && contactSupported && <button onClick={onLoadContact} className="bg-[#00B050] py-1 px-2 shadow-md text-white">
              連絡先をロード
            </button>
          }
        </div>
        <div className="h-full mt-1 overflow-auto flex flex-col">
          {
            contacts.map((_, i) => (
              <div key={i} className="border-b p-2 border-gray-300 rounded-sm" onClick={() => onContactClick(_)}>
                <div>{_.name || 'Unknown User'}</div>
                <div className="text-lg">{_.phone || "No Phone Number"}</div>
              </div>
            ))
          }
        </div>
        <ActionPrompt contact={selContact.current} isOpen={isOpen} setIsOpen={setIsOpen} loadContact={() => type && loadContact(type)} />
      </div>
    </>
  )
}

export default Contacts