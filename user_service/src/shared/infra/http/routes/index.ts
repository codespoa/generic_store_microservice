import { Router } from 'express'
import usersRouter from '@modules/Users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/Users/infra/http/routes/sessions.routes'

const routes = Router()

routes.use('/user', usersRouter)
routes.use('/session', sessionsRouter)

export default routes
