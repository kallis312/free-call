import { SweetAlertResult } from "sweetalert2"

export const contactType = ['company', 'personal']

export type ContactType = typeof contactType[number]

export interface Contact {
  id: number
  name: string
  email: string | null
  phone: number | null
  type: ContactType
}

export type ModalClose = {
  onClose: (result?: Partial<SweetAlertResult> | undefined) => void
}