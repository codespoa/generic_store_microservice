import { Request, Response } from 'express'

import {
  CreateUserService,
  ReturnAllUserService,
} from '@modules/Users/services'
import UsersRepository from '@modules/Users/infra/mongoose/repositories/UsersRepository'
import { Controller } from '@shared/protocols'

export default class UsersController implements Controller {
  public async index(request: Request, response: Response): Promise<Response> {
    const userRepository = new UsersRepository()
    const allUsers = await new ReturnAllUserService(userRepository).execute()

    return response.json(allUsers)
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const payload = request.body

    const userRepository = new UsersRepository()
    const createAnUser = await new CreateUserService(userRepository).execute(
      payload
    )

    return response.json(createAnUser)
  }

  show(request: Request, response: Response): Promise<Response> {
    return new Promise((resolve) => resolve(null))
  }
  delete(request: Request, response: Response): Promise<Response> {
    return new Promise((resolve) => resolve(null))
  }
  update(request: Request, response: Response): Promise<Response> {
    return new Promise((resolve) => resolve(null))
  }
}
