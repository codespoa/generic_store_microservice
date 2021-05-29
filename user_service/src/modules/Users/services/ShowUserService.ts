import IUsersRepository from '@modules/Users/repositories/IUsersRepository'
import IReturnUserDTO from '@modules/Users/dtos/IReturnUserDTO'
import Service from '@shared/protocols/Service'
import { AppError } from '@shared/error'

export class ShowUserService implements Service {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({ id }): Promise<IReturnUserDTO | undefined> {
    const user = await this.usersRepository.findById(id)

    if (!user) throw new AppError('User not found', 404)

    return user
  }
}
