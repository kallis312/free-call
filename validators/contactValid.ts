import { object, enum as enum_, string, number, array } from "ajv-ts"

export const getContactsReqValid = object({
  type: enum_(['personal', 'company', 'all']),
  userId: number()
}).strict().required()

export const addContactsReqValid = object({
  userId: number(),
  type: enum_(['personal', 'company']),
  contacts: array(object({
    phon: string(),
    name: string(),
    email: string().format('email')
  }).strict().requiredFor('name').partialFor('email').partialFor('phon'))
}).strict().required()

export const getContactReqValid = object({
  phone: string()
}).strict().required()