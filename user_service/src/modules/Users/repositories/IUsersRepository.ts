import IcreateUser from '@modules/Users/dtos/ICreateUserDTO'
import IReturnUserDTO from '@modules/Users/dtos/IReturnUserDTO'

export default interface IUsersRepository {
  getAllUsers(): Promise<IReturnUserDTO[]> | undefined
  findByEmail(email: string): Promise<IReturnUserDTO | undefined>
  create(data: IcreateUser): Promise<IReturnUserDTO>
  // findById(id: string): Promise<IReturnUserDTO | undefined>
  // save(user: IcreateUser): Promise<IReturnUserDTO>
  // remove(id: string): Promise<void>
}
