import { AppError } from '@shared/error'
import FakesProductRepository from '@modules/Product/repositories/fakes/FakesProductRepository'
import { CreateProductService, SearchProductService } from '.'
import tokenExample from '@config/token'

describe('Search Product', () => {
  it('should be able to find a product', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const searchProduct = new SearchProductService(fakeProductRepository)

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
      code: create.product_code,
      page: '1',
    }

    const show = await searchProduct.execute(payload)

    expect(show).toBeTruthy()
  })

  it('should be not show if product not found', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const searchProduct = new SearchProductService(fakeProductRepository)

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
      code: 'wrong_code',
      page: '1',
    }

    const show = searchProduct.execute(payload)

    expect(show).rejects.toBeInstanceOf(AppError)

    return createProduct
  })

  it('should verify if role is not gerente', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const searchProduct = new SearchProductService(fakeProductRepository)

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
      token: tokenExample.token_example_fail,
      code: 'wrong_code',
      page: '1',
    }

    const update = searchProduct.execute(payload)

    expect(update).rejects.toBeInstanceOf(AppError)
  })

  it('should verify if role is not provider', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const searchProduct = new SearchProductService(fakeProductRepository)

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
      code: 'wrong_code',
      page: '1',
    }

    const update = searchProduct.execute(payload)

    expect(update).rejects.toBeInstanceOf(AppError)
  })
})
