import Product from '@modules/Product/infra/mongoose/entities/Product'
import IProductRepository from '@modules/Product/repositories/IProductRepository'
import ICreateProductDTO from '@modules/Product/dtos/ICreateProductDTO'
import IReturnProductDTO from '@modules/Product/dtos/IReturnProductDTO'

class ProductRepository implements IProductRepository {
  public async getAll(): Promise<IReturnProductDTO[]> | undefined {
    const allProducts = await Product.find({})

    return allProducts
  }
  public async create(payload: ICreateProductDTO): Promise<IReturnProductDTO> {
    const { name, value, weight, product_code, seller, store } = payload

    const createAProduct = await Product.create({
      name,
      value,
      weight,
      product_code,
      seller,
      store,
    })

    return createAProduct
  }
  public async findByCode(
    code: string
  ): Promise<IReturnProductDTO | undefined> {
    const findProduct = await Product.findOne({ product_code: code })

    return findProduct
  }
}

export default ProductRepository
