import FakesProductRepository from '@modules/Product/repositories/fakes/FakesProductRepository'
import { CreateProductService, IndexProductService } from '.'
import tokenExample from '@config/token'

describe('Index Product', () => {
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

    const payload = {
      limit: 10,
      page: 1,
    }

    const indexProduct = new IndexProductService(fakeProductRepository)
    const index = await indexProduct.execute(payload)

    expect(index).toBeTruthy()
  })
})
