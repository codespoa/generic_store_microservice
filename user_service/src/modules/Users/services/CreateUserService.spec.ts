import { AppError } from '@shared/error'

import FakesUserRepository from '../repositories/fakes/FakesUserRepository'

import { CreateUserService } from './'

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakesUserRepository()
    const createUser = new CreateUserService(fakeUsersRepository)

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jonh@example.com',
      password: '123456',
      role: 'any_role',
    })

    expect(user).toHaveProperty('id')
  })

  it('should be not create two users with same email', async () => {
    const fakeUsersRepository = new FakesUserRepository()
    const createUser = new CreateUserService(fakeUsersRepository)

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jonh@example.com',
      password: '123456',
      role: 'any_role',
    })

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jonh@example.com',
        password: '123456',
        role: 'any_role',
      })
    ).rejects.toBeInstanceOf(AppError)

    return user
  })
})
