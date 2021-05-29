import { Encrypter } from '@shared/adapter/Encrypter'
import { AppError } from '@shared/error'
import IUsersRepository from '@modules/Users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/Users/dtos/ICreateUserDTO'
import IReturnUserDTO from '@modules/Users/dtos/IReturnUserDTO'
import Service from '@shared/protocols/Service'

export class CreateUserService implements Service {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({
    email,
    name,
    password,
    role,
  }: ICreateUserDTO): Promise<IReturnUserDTO> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) throw new AppError('This user already in use', 409)

    const encrypter = new Encrypter()
    const passwordHashed = await encrypter.encrypt(password, 12)

    const createAnUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
      role,
    })

    return createAnUser
  }
}
