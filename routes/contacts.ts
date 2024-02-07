import { Router } from 'express'
import passport from 'passport'
import { getContacts, addContacts, deleteContact, getContact, updateContact } from '@Ctr/contactsCtr'

const requireAuth = passport.authenticate("jwt", { session: false })

const routes = Router()

routes
  .get('/', requireAuth, getContacts)
  .get('/:phone', requireAuth, getContact)
  .post('/', requireAuth, addContacts)
  .put('/:id', requireAuth, updateContact)
  .delete('/:id', requireAuth, deleteContact)

module.exports = routes