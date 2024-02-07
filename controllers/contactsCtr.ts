import { Request, Response } from 'express'
import contactsModel from '@/models/contactsModel'
import { addContactsReqValid, getContactsReqValid, getContactReqValid, updateContactsReqValid } from '@Validate/contactValid'
// import { UsertModel } from '@/models/userModel'

export const getContacts = async (req: Request, res: Response) => {
  try {
    const { type, userId } = getContactsReqValid.parse({ ...req.query, userId: req.user?.id })
    const result = await contactsModel.findAll({ where: type === 'all' ? { userId } : { userId, type } })
    res.json(result)
  } catch (err) {
    res.status(422).json({ message: err instanceof Error ? err.message : err })
  }
}

export const getContact = async (req: Request, res: Response) => {
  try {
    const { phone } = getContactReqValid.parse(req.params)
    const existUser = await contactsModel.findOne({ where: { phone: phone, userId: req.user?.id } })
    if (existUser)
      res.json(existUser)
    else
      res.json(null)
  } catch (err) {
    res.status(422).json({ message: err instanceof Error ? err.message : err })
  }
}

export const addContacts = async (req: Request, res: Response) => {
  try {
    const { contacts, userId, type } = addContactsReqValid.parse({ ...req.body, userId: req.user?.id })
    const result = await contactsModel.bulkCreate(contacts.map(_c => ({ userId, type, ..._c })))
    res.status(201).json({
      message: `${result.length} contacts added successfully.`
    })
  } catch (err) {
    res.status(422).json({ message: err instanceof Error ? err.message : err })
  }
}

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await contactsModel.destroy({ where: { id } })
    res.json({ message: `${id} contact deleted successfully.` })
  } catch (err) {
    res.status(422).json({ message: err instanceof Error ? err.message : err })
  }
}

export const updateContact = async (req: Request, res: Response) => {
  try {
    const { contact, id } = updateContactsReqValid.parse({ ...req.body, ...req.params })
    await contactsModel.update(contact, { where: { id } })
    res.json({ message: `${id} contact updated successfully.` })
  } catch (err) {
    res.status(422).json({ message: err instanceof Error ? err.message : err })
  }
}