import { AppError } from '@shared/error'

import FakesUserRepository from '../repositories/fakes/FakesUserRepository'
import { AuthenticateUserService, CreateUserService } from './'

describe('AuthenticateUser', () => {
  it('should be able to authenticated an user', async () => {
    const fakeUsersRepository = new FakesUserRepository()
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository)
    const createUser = new CreateUserService(fakeUsersRepository)

    await createUser.execute({
      name: 'John Doe',
      email: 'jonh@example.com',
      password: '123456',
    })

    const response = await authenticateUser.execute({
      email: 'jonh@example.com',
      password: '123456',
    })

    expect(response).toHaveProperty('token')
  })

  it('should fail if email is invalid', async () => {
    const fakeUsersRepository = new FakesUserRepository()
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository)
    const createUser = new CreateUserService(fakeUsersRepository)

    await createUser.execute({
      name: 'John Doe',
      email: 'doe_john@example.com',
      password: '654321',
    })

    expect(
      authenticateUser.execute({
        email: 'jonh@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should fail if password is invalid', async () => {
    const fakeUsersRepository = new FakesUserRepository()
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository)
    const createUser = new CreateUserService(fakeUsersRepository)

    await createUser.execute({
      name: 'John Doe',
      email: 'jonh@example.com',
      password: '654321',
    })

    expect(
      authenticateUser.execute({
        email: 'jonh@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should fail if login is invalid', async () => {
    const fakeUsersRepository = new FakesUserRepository()
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository)
    const createUser = new CreateUserService(fakeUsersRepository)

    await createUser.execute({
      name: 'John Doe',
      email: 'doe@example.com',
      password: '654321',
    })

    expect(
      authenticateUser.execute({
        email: 'jonh@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
