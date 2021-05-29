import { Request, response, Response } from 'express'

import {
  CreateUserService,
  ReturnAllUserService,
  ShowUserService,
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

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const userRepository = new UsersRepository()
    const showUser = await new ShowUserService(userRepository).execute({
      id,
    })

    return response.status(200).json(showUser)
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    return new Promise((resolve) => resolve(null))
  }
  public async update(request: Request, response: Response): Promise<Response> {
    return new Promise((resolve) => resolve(null))
  }
}
