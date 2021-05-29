import { Router } from 'express'
import SessionsController from '../controllers/SessionsController'
const sessionsController = new SessionsController()

import Validate from '@shared/middlewares/Validate'
import userValidator from '@shared/validators/Users'

const sessionsRouter = Router()

sessionsRouter.post(
  '/',
  Validate(userValidator.session),
  sessionsController.create
)

export default sessionsRouter
