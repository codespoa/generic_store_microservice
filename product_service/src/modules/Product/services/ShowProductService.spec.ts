import { AppError } from '@shared/error'
import FakesProductRepository from '@modules/Product/repositories/fakes/FakesProductRepository'
import { CreateProductService, ShowProductService } from '.'
import tokenExample from '@config/token'

describe('Show Product', () => {
  it('should be able to return a product', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const showProduct = new ShowProductService(fakeProductRepository)

    const create = await createProduct.execute({
      name: 'any_name',
      value: 1000,
      weight: 100,
      seller: 'any_seller',
      store: 'any_store',
      product_code: 'any_product_code',
      token: tokenExample.token_example_success,
    })

    const payload = {
      token: tokenExample.token_example_success,
      id: create._id,
    }

    const show = await showProduct.execute(payload)

    expect(show).toBeTruthy()
  })

  it('should be not show if product not found', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const showProduct = new ShowProductService(fakeProductRepository)

    await createProduct.execute({
      name: 'any_name',
      value: 1000,
      weight: 100,
      seller: 'any_seller',
      store: 'any_store',
      product_code: 'any_product_code',
      token: tokenExample.token_example_success,
    })

    const payload = {
      token: tokenExample.token_example_success,
      id: 'wrong_id',
    }

    const show = showProduct.execute(payload)

    expect(show).rejects.toBeInstanceOf(AppError)

    return createProduct
  })

  it('should verify if role is not gerente or client', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const showProduct = new ShowProductService(fakeProductRepository)

    const create = await createProduct.execute({
      name: 'any_name',
      value: 1000,
      weight: 100,
      seller: 'any_seller',
      store: 'any_store',
      product_code: 'any_product_code',
      token: tokenExample.token_example_success,
    })

    const payload = {
      token: tokenExample.token_example_fail,
      id: create._id,
    }

    const update = showProduct.execute(payload)

    expect(update).rejects.toEqual({
      errorCode: 403,
      errorMessage: "You don't have permission to access this feature",
    })
  })

  it('should verify if role is not provider', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const showProduct = new ShowProductService(fakeProductRepository)

    const create = await createProduct.execute({
      name: 'any_name',
      value: 1000,
      weight: 100,
      seller: 'any_seller',
      store: 'any_store',
      product_code: 'any_product_code',
      token: tokenExample.token_example_success,
    })

    const payload = {
      id: create._id,
    }

    const update = showProduct.execute(payload)

    expect(update).rejects.toBeInstanceOf(AppError)
  })
})
