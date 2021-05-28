import { v4 as uuid } from 'uuid'
import IProductRepository from '@modules/Product/repositories/IProductRepository'
import IReturnProductDTO from '@modules/Product/dtos/IReturnProductDTO'
import ICreateProductDTO from '@modules/Product/dtos/ICreateProductDTO'
import Product from '@modules/Product/infra/mongoose/entities/Product'

export interface IProductInterface {
  _id: string
  name: string
  value: Number
  weight: Number
  seller: string
  store: string
  product_code: string
}

class FakesProductRepository implements IProductRepository {
  private products: IProductInterface[] = []

  public async getAll(): Promise<IReturnProductDTO[] | undefined> {
    const product = new Product()

    Object.assign(product, { _id: uuid() })

    this.products.push(product)

    return product
  }

  public async findByCode(
    code: string
  ): Promise<IReturnProductDTO | undefined> {
    const findProduct = this.products.find(
      (_code) => _code.product_code === code
    )

    return findProduct
  }

  public async create(payload: ICreateProductDTO): Promise<IReturnProductDTO> {
    const product = new Product()

    Object.assign(product, { _id: uuid() }, payload)

    this.products.push(product)

    return product
  }

  public async save(product: IProductInterface): Promise<IReturnProductDTO> {
    const findIndex = this.products.findIndex(
      (findProduct) => findProduct._id === product._id
    )

    this.products[findIndex] = product

    return product
  }
}

export default FakesProductRepository
