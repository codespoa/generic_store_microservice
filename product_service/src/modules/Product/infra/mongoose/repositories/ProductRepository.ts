import Product from '@modules/Product/infra/mongoose/entities/Product'
import IProductRepository from '@modules/Product/repositories/IProductRepository'
import {
  ICreateProductDTO,
  IReturnProductDTO,
  IUpdateProductDTO,
  IReturnUpdateProductDTO,
} from '@modules/Product/dtos'

class ProductRepository implements IProductRepository {
  public async getAll(payload: any): Promise<any | undefined> {
    const allProducts = await Product.paginate(
      {},
      { limit: payload.limit, page: payload.page }
    )

    return allProducts
  }
  public async create(payload: ICreateProductDTO): Promise<IReturnProductDTO> {
    const { name, value, weight, product_code, seller, store, available } =
      payload

    const createAProduct = await Product.create({
      name,
      value,
      weight,
      product_code,
      seller,
      store,
      available,
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

  public async getAllByCode(payload: any): Promise<any> | undefined {
    return await Product.paginate(
      { product_code: payload.code },
      { limit: 15, page: payload.page }
    )
  }

  public async delete(id: string): Promise<void> {
    await Product.findByIdAndDelete(id)
  }
}

export default ProductRepository
