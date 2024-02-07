import { setUser, tokenUser, updateUser } from '@Ctr/userCtr'
import { Router } from 'express'
import passport from 'passport'

const requireAuth = passport.authenticate("jwt", { session: false })

const routes = Router()

routes
  .post('/', setUser)
  .put('/:id', requireAuth, updateUser)
  .post('/token', requireAuth, tokenUser)

module.exports = routes