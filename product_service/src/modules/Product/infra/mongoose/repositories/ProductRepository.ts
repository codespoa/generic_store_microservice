import Product from '@modules/Product/infra/mongoose/entities/Product'
import IProductRepository from '@modules/Product/repositories/IProductRepository'
import ICreateProductDTO from '@modules/Product/dtos/ICreateProductDTO'
import IReturnProductDTO from '@modules/Product/dtos/IReturnProductDTO'
import IUpdateProductDTO from '@modules/Product/dtos/IUpdateProductDTO'

import IReturnUpdateProductDTO from '@modules/Product/dtos/IReturnUpdateProductDTO'

class ProductRepository implements IProductRepository {
  public async getAll(): Promise<any | undefined> {
    const allProducts = await Product.paginate()

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

  public async findById(id: string): Promise<IReturnProductDTO | undefined> {
    const findProduct = await Product.findOne({ _id: id })

    return findProduct
  }

  public async update(
    id: string,
    payload: IUpdateProductDTO
  ): Promise<IReturnUpdateProductDTO> {
    const updateProduct = await Product.findOneAndUpdate({ _id: id }, payload, {
      returnOriginal: false,
    })

    return updateProduct
  }
}

export default ProductRepository
