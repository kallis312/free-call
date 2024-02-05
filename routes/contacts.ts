import { Router } from 'express'
import passport from 'passport'
import { getContacts, addContacts, deleteContact, getContact } from '@Ctr/contactsCtr'

const requireAuth = passport.authenticate("jwt", { session: false })

const routes = Router()

routes
  .get('/', requireAuth, getContacts)
  .get('/:phone', requireAuth, getContact)
  .post('/', addContacts)
  .delete('/:id', deleteContact)

module.exports = routes