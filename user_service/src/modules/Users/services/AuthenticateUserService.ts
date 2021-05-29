import { sign } from 'jsonwebtoken'
import { Encrypter } from '@shared/adapter/Encrypter'
import configAuth from '@config/auth'
import { AppError } from '@shared/error'
import IUsersRepository from '@modules/Users/repositories/IUsersRepository'
import Service from '@shared/protocols/Service'

interface RequestDTO {
  email: string
  password: string
}

interface ResponseUser {
  user: Object
  token: string
}
export class AuthenticateUserService implements Service {
  private usersRepository: IUsersRepository
  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  public async execute({ email, password }: RequestDTO): Promise<ResponseUser> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Email or password invalid', 401)
    }

    const compareHash = new Encrypter()

    const passwordMatched = await compareHash.compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Email or password invalid', 401)
    }

    const { secret, expiresIn } = configAuth.jwt

    const token = sign({ subject: user._id, expire: expiresIn }, secret)

    return {
      user,
      token,
    }
  }
}
