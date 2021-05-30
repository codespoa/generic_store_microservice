import { v4 as uuid } from 'uuid'
import IProductRepository from '@modules/Product/repositories/IProductRepository'
import IReturnProductDTO from '@modules/Product/dtos/IReturnProductDTO'
import ICreateProductDTO from '@modules/Product/dtos/ICreateProductDTO'
import Product from '@modules/Product/infra/mongoose/entities/Product'
import IUpdateProductDTO from '@modules/Product/dtos/IUpdateProductDTO'

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
      (product) => product.product_code === code
    )

    return findProduct
  }

  public async findById(id: string): Promise<IReturnProductDTO | undefined> {
    const findProduct = this.products.find((product) => product._id === id)

    return findProduct
  }

  public async create(payload: ICreateProductDTO): Promise<IReturnProductDTO> {
    const product = new Product()

    Object.assign(product, { _id: uuid() }, payload)

    this.products.push(product)

    return product
  }

  public async update(id: string, product: IUpdateProductDTO): Promise<any> {
    const findIndex = this.products.findIndex(
      (findProduct) => findProduct._id === id
    )

    this.products[findIndex]._id = id
    this.products[findIndex].product_code = id

    return product
  }
}

export default FakesProductRepository
