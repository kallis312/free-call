import { object, enum as enum_, string, number, array } from "ajv-ts"

export const setUserReqValid = object({
  name: string(),
  phone: string(),
  email: string()
}).strict().required().partialFor('name').partialFor('email')