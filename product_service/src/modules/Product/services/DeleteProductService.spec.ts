import { AppError } from '@shared/error'
import FakesProductRepository from '@modules/Product/repositories/fakes/FakesProductRepository'
import { CreateProductService, DeleteProductService } from '.'
import tokenExample from '@config/token'

describe('Delete Product', () => {
  it('should be able to delete a product', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const deleteProduct = new DeleteProductService(fakeProductRepository)

    const product = await createProduct.execute({
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
      id: product._id,
    }

    const productDelete = await deleteProduct.execute(payload)

    expect(productDelete).toBeUndefined()
  })

  it('should be able to return 500 error if product not found', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const deleteProduct = new DeleteProductService(fakeProductRepository)

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

    const productDelete = deleteProduct.execute(payload)

    expect(productDelete).rejects.toEqual({
      errorCode: 404,
      errorMessage: 'Product not found',
    })
  })

  it('should verify if role is not gerente', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const deleteProduct = new DeleteProductService(fakeProductRepository)
    const createProduct = new CreateProductService(fakeProductRepository)

    const product = await createProduct.execute({
      name: 'any_name',
      value: 1000,
      weight: 100,
      seller: 'any_seller',
      store: 'any_store',
      product_code: 'any_product_code',
      token: tokenExample.token_example_success,
    })

    const productDelete = deleteProduct.execute({
      token: tokenExample.token_example_fail,
      id: product._id,
    })

    expect(productDelete).rejects.toEqual({
      errorCode: 403,
      errorMessage: "You don't have permission to access this feature",
    })
  })

  it('should verify if role is not provider', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)
    const deleteProduct = new DeleteProductService(fakeProductRepository)

    const product = await createProduct.execute({
      name: 'any_name',
      value: 1000,
      weight: 100,
      seller: 'any_seller',
      store: 'any_store',
      product_code: 'any_product_code',
      token: tokenExample.token_example_success,
    })

    const productDelete = deleteProduct.execute({
      id: product._id,
    })

    expect(productDelete).rejects.toBeInstanceOf(AppError)
  })
})
