import FakesUserRepository from '../repositories/fakes/FakesUserRepository'
import { ReturnAllUserService, CreateUserService } from './'

describe('Return All Users', () => {
  it('should be able to return all users', async () => {
    const fakeUsersRepository = new FakesUserRepository()
    const createUser = new CreateUserService(fakeUsersRepository)

    await createUser.execute({
      name: 'John',
      email: 'jonh@example.com',
      password: '123456',
    })

    await createUser.execute({
      name: 'Doe',
      email: 'doe@example.com',
      password: '123456',
    })

    const returnAllUser = new ReturnAllUserService(fakeUsersRepository)

    const returnAll = await returnAllUser.execute()

    expect(returnAll).toBeTruthy()
  })
})
