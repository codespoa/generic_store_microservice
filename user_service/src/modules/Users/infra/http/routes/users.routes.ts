import { Router } from 'express'

import ensureAuthenticad from '../middleware/ensureAuthenticad'

import Validate from '@shared/middlewares/Validate'
import userValidator from '@shared/validators/Users'

const usersRouter = Router()

import UsersController from '../controllers/UsersController'
const usersController = new UsersController()

usersRouter.get('/', ensureAuthenticad, usersController.index)
usersRouter.post('/', Validate(userValidator.create), usersController.store)

export default usersRouter
