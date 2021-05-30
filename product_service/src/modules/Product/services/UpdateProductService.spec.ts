import { AppError } from '@shared/error'
import FakesProductRepository from '@modules/Product/repositories/fakes/FakesProductRepository'
import { CreateProductService, UpdateProductService } from '.'
import tokenExample from '@config/token'

describe('Update Product', () => {
  it('should be able to update a product', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const updateProduct = new UpdateProductService(fakeProductRepository)

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
      name: 'any_name_update',
      value: 2000,
      weight: 200,
      seller: 'any_seller_update',
      store: 'any_store_update',
      product_code: 'any_product_code_update',
      token: tokenExample.token_example_success,
    }

    const update = await updateProduct.execute(payload)

    expect(update).toBeTruthy()
    expect(update.name).toBe('any_name_update')
    expect(update.value).toBe(2000)
    expect(update.weight).toBe(200)
    expect(update.seller).toBe('any_seller_update')
    expect(update.store).toBe('any_store_update')
  })

  it('should be not update if product not found', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const updateProduct = new UpdateProductService(fakeProductRepository)

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
      id: 'wrong_id',
      name: 'any_name_update',
      value: 2000,
      weight: 200,
      seller: 'any_seller_update',
      store: 'any_store_update',
      product_code: 'any_product_code_update',
      token: tokenExample.token_example_success,
    }

    const update = updateProduct.execute(payload)

    expect(update).rejects.toBeInstanceOf(AppError)

    return createProduct
  })

  it('should verify if role is not gerente', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const updateProduct = new UpdateProductService(fakeProductRepository)

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
      id: 'wrong_id',
      name: 'any_name_update',
      value: 2000,
      weight: 200,
      seller: 'any_seller_update',
      store: 'any_store_update',
      product_code: 'any_product_code_update',
      token: tokenExample.token_example_fail,
    }

    const update = updateProduct.execute(payload)

    expect(update).rejects.toBeInstanceOf(AppError)
  })

  it('should verify if role is not provider', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const updateProduct = new UpdateProductService(fakeProductRepository)

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
      id: 'wrong_id',
      name: 'any_name_update',
      value: 2000,
      weight: 200,
      seller: 'any_seller_update',
      store: 'any_store_update',
      product_code: 'any_product_code_update',
    }

    const update = updateProduct.execute(payload)

    expect(update).rejects.toBeInstanceOf(AppError)
  })
})
