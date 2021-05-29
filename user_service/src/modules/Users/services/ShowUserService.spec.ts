import FakesUserRepository from '../repositories/fakes/FakesUserRepository'
import { ReturnAllUserService, CreateUserService, ShowUserService } from './'

describe('Show Users', () => {
  it('should be able to return an users', async () => {
    const fakeUsersRepository = new FakesUserRepository()
    const create = new CreateUserService(fakeUsersRepository)
    const showUser = new ShowUserService(fakeUsersRepository)

    const createUser = await create.execute({
      name: 'John',
      email: 'jonh@example.com',
      password: '123456',
      role: 'any_role',
    })

    const user = await showUser.execute({
      id: createUser._id,
    })

    expect(user.email).toBe('jonh@example.com')
    expect(user._id).toBe(createUser._id)
  })
})
