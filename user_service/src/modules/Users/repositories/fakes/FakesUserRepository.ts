import { v4 as uuid } from 'uuid'
import IUsersRepository from '@modules/Users/repositories/IUsersRepository'
import IReturnUserDTO from '@modules/Users/dtos/IReturnUserDTO'
import User from '@modules/Users/infra/mongoose/entities/User'

export interface IUserInterface {
  _id: string
  name: string
  email: string
  password: string
  rented_books: []
}

class UsersRepository implements IUsersRepository {
  private users: IUserInterface[] = []

  public async getAllUsers(): Promise<IReturnUserDTO[] | undefined> {
    const user = new User()

    Object.assign(user, { _id: uuid() })

    this.users.push(user)

    return user
  }

  public async findById(id: string): Promise<IReturnUserDTO | undefined> {
    const findUser = this.users.find((user) => user._id === id)

    return findUser
  }
  public async findByEmail(email: string): Promise<IReturnUserDTO | undefined> {
    const findUser = this.users.find((user) => user.email === email)

    return findUser
  }

  public async create(payload: IUserInterface): Promise<IReturnUserDTO> {
    const user = new User()

    Object.assign(user, { _id: uuid() }, payload)

    this.users.push(user)

    return user
  }

  public async save(user: IUserInterface): Promise<IReturnUserDTO> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser._id === user._id
    )

    this.users[findIndex] = user

    return user
  }
}

export default UsersRepository
