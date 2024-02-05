import userModel from '@/models/userModel'
import { setUserReqValid } from '@Validate/userValid'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET || 'secret'

export const setUser = async (req: Request, res: Response) => {
  try {
    const nUser = setUserReqValid.parse(req.body)
    const existUser = await userModel.findOne({ where: { phone: nUser.phone } })
    if (existUser) {
      const token = getToken(existUser)
      res.json({ token, id: existUser.id, phone: existUser.phone, name: existUser.name, email: existUser.email })
    } else {
      const result = await userModel.create(nUser)
      const token = getToken(result)
      res.json({ token, id: result.id, phone: result.phone, name: result.name, email: result.email })
    }
  } catch (err) {
    res.status(422).json({ message: err instanceof Error ? err.message : err })
  }
}


const getToken = ({ id, phone, name, email }: any): string => {
  const token = 'JWT ' + sign({ id, phone, name, email }, secretKey)
  return token
}

export const tokenUser = async (req: Request, res: Response) => {
  try {
    const token = getToken(req.user)
    res.json({ token, id: req.user?.id, phone: req.user?.phone, name: req.user?.name, email: req.user?.email })
  } catch (err) {
    res.status(422).json({ message: err instanceof Error ? err.message : err })
  }
}