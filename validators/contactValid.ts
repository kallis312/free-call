import { object, enum as enum_, string, number, array } from "ajv-ts"

export const getContactsReqValid = object({
  type: enum_(['personal', 'company', 'all']),
  userId: number()
}).strict().required()

export const addContactsReqValid = object({
  userId: number(),
  type: enum_(['personal', 'company']),
  contacts: array(object({
    phone: string(),
    name: string(),
    email: string().format('email')
  }).strict().requiredFor('name').partialFor('email').partialFor('phone'))
}).strict().required()

export const updateContactsReqValid = object({
  id: string().postprocess(_v => Number(_v), number()),
  contact: object({
    phone: string(),
    name: string(),
    email: string().format('email').nullable(),
    type: enum_(['personal', 'company'])
  }).strict().partialFor('name').partialFor('email').partialFor('phone')
}).strict().required()

export const getContactReqValid = object({
  phone: string()
}).strict().required()