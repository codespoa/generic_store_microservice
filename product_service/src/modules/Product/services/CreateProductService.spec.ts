import { AppError } from '@shared/error'
import FakesProductRepository from '@modules/Product/repositories/fakes/FakesProductRepository'
import { CreateProductService } from '.'

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
    })

    expect(
      createProduct.execute({
        name: 'any_name',
        value: 1000,
        weight: 100,
        seller: 'any_seller',
        store: 'any_store',
        product_code: 'any_product_code',
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
    })

    const promise = jest
      .spyOn(createProduct, 'execute')
      .mockReturnValueOnce(
        new Promise((resolve, reject) =>
          reject(new AppError('Error in create a product', 500))
        )
      )
    await expect(promise).rejects.toBeInstanceOf(AppError)
  })
})
