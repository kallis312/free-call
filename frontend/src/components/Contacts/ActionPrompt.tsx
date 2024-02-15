import AppModal, { ModalProps } from "@/components/common/AppModal"
import { Contact } from "@/types/define"
import axios from "axios"
import { FC, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

type Props = {
  contact?: Contact
  loadContact: () => void
} & ModalProps

const ActionPrompt: FC<Props> = ({ contact, isOpen, setIsOpen = () => { }, loadContact }): ReactNode => {
  const navigate = useNavigate()

  const onDeleteAction = async (id: number) => {
    try {
      const { isConfirmed } = await Swal.fire({
        icon: 'warning',
        text: `Do you remove ${contact?.name} - ${contact?.phone}?`,
        showCancelButton: true,
        confirmButtonText: 'はい',
        cancelButtonText: 'Reject',
      })
      if (isConfirmed) {
        await axios.delete('/contacts/' + id)
        loadContact()
        await Swal.fire({
          icon: 'success',
          text: 'Deleted successfully.',
          confirmButtonText: 'はい'
        })
        setIsOpen(false)
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        text: err instanceof Error ? err.message : 'Unknown Error.',
        confirmButtonText: 'はい'
      })
    }
  }

  const onUpdateAction = async (updateId: number, type: string) => {
    try {
      await axios.put('/contacts/' + updateId, {
        contact: {
          name: contact?.name,
          phone: contact?.phone,
          email: contact?.email,
          type
        }
      })
      await Swal.fire({
        icon: 'success',
        text: 'Updated successfully.',
        confirmButtonText: 'はい'
      })
      setIsOpen(false)
      loadContact()
    } catch (err) {
      Swal.fire({
        icon: 'error',
        text: err instanceof Error ? err.message : 'Unknown Error.',
        confirmButtonText: 'はい'
      })
    }
  }

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>{contact?.name}, {contact?.phone || contact?.email}</div>
      <div className="grid-cols-2 gap-3 grid">
        <button>
          <img src={'/rsc/call_btn.png'} width={120} className="h-[77px]" />
        </button>
        <button>
          <img src={'/rsc/amend_btn.png'} width={120} className="h-[77px]" />
        </button>
        {
          contact?.type === 'company' ?
            <button onClick={() => onUpdateAction(contact.id, 'personal')}>
              <img src={'/rsc/5.png'} width={120} className="h-[77px]" />
            </button> : contact &&
            <button onClick={() => onUpdateAction(contact.id, 'company')}>
              <img src={'/rsc/6.jpg'} width={120} className="h-[77px]" />
            </button>
        }
        <button>
          <img src={'/rsc/goback_btn.png'} onClick={() => setIsOpen(false)} width={120} className="h-[77px]" />
        </button>
      </div>
      <div>
        <button onClick={() => navigate('/calling/send/' + contact?.phone)} className="w-full red-grad-bg py-3 text-white text-2xl font-bold rounded-md mt-3 border-4 border-red-600 shadow-lg">
          履歴から削除
        </button>
      </div>
      <div className="flex justify-center mt-3">
        <button onClick={() => contact?.id && onDeleteAction(contact.id)}>
          <img src={'/rsc/delete_btn.png'} width={120} className="h-[77px]" />
        </button>
      </div>
    </AppModal>
  )
}

export default ActionPrompt