import { setUser, tokenUser } from '@Ctr/userCtr'
import { Router } from 'express'
import passport from 'passport'

const requireAuth = passport.authenticate("jwt", { session: false })

const routes = Router()

routes
  .post('/', setUser)
  .post('/token', requireAuth, tokenUser)

module.exports = routes