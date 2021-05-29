import IUsersRepository from '@modules/Users/repositories/IUsersRepository'
import IReturnUserDTO from '@modules/Users/dtos/IReturnUserDTO'
import Service from '@shared/protocols/Service'

export class ReturnAllUserService implements Service {
  private usersRepository: IUsersRepository
  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  public async execute(): Promise<IReturnUserDTO[]> {
    return await this.usersRepository.getAllUsers()
  }
}
