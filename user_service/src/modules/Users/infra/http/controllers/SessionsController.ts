import { Request, Response } from 'express'
import { AuthenticateUserService } from '@modules/Users/services'
import UsersRepository from '@modules/Users/infra/mongoose/repositories/UsersRepository'

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const userRepository = new UsersRepository()

    const authenticateUser = await new AuthenticateUserService(
      userRepository
    ).execute({ email, password })

    return response.json(authenticateUser)
  }
}
