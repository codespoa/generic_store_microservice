import { AppError } from '@shared/error'
import FakesProductRepository from '@modules/Product/repositories/fakes/FakesProductRepository'
import { CreateProductService } from '.'
import tokenExample from '@config/token'

describe('CreateProduct', () => {
  it('should be able to create a new product', async () => {
    const fakeProductRepository = new FakesProductRepository()
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

    expect(product).toBeTruthy()
    expect(product.name).toBe('any_name')
    expect(product.value).toBe(1000)
    expect(product.weight).toBe(100)
    expect(product.seller).toBe('any_seller')
    expect(product.store).toBe('any_store')
    expect(product.product_code).toBe('any_product_code')
  })

  it('should be not create two product with same product code', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)

    await createProduct.execute({
      name: 'any_name',
      value: 1000,
      weight: 100,
      seller: 'any_seller',
      store: 'any_store',
      product_code: 'any_product_code',
      token: tokenExample.token_example_success,
    })

    expect(
      createProduct.execute({
        name: 'any_name',
        value: 1000,
        weight: 100,
        seller: 'any_seller',
        store: 'any_store',
        product_code: 'any_product_code',
        token: tokenExample.token_example_success,
      })
    ).rejects.toBeInstanceOf(AppError)

    return createProduct
  })

  it('should be able to return 500 error if product does created', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)

    await createProduct.execute({
      name: 'any_name',
      value: 1000,
      weight: 100,
      seller: 'any_seller',
      store: 'any_store',
      product_code: 'any_product_code',
      token: tokenExample.token_example_success,
    })

    const promise = jest
      .spyOn(createProduct, 'execute')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new AppError('Error', 500)))
      )
    await expect(promise).rejects.toBeInstanceOf(AppError)
  })

  it('should verify if role is not gerente', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)

    expect(
      createProduct.execute({
        name: 'any_name',
        value: 1000,
        weight: 100,
        seller: 'any_seller',
        store: 'any_store',
        product_code: 'any_product_code',
        token: tokenExample.token_example_fail,
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should verify if role is not provider', async () => {
    const fakeProductRepository = new FakesProductRepository()
    const createProduct = new CreateProductService(fakeProductRepository)

    const create = createProduct.execute({
      name: 'any_name',
      value: 1000,
      weight: 100,
      seller: 'any_seller',
      store: 'any_store',
      product_code: 'any_product_code',
    })

    expect(create).rejects.toBeInstanceOf(AppError)
  })
})
