import { AppError } from '@shared/error'
import IProductRepository from '@modules/Product/repositories/IProductRepository'
import ICreateProductDTO from '@modules/Product/dtos/ICreateProductDTO'
import IReturnProductDTO from '@modules/Product/dtos/IReturnProductDTO'
import Service from '@shared/protocols/Service'

export class CreateProductService implements Service {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute({
    name,
    value,
    weight,
    seller,
    store,
    product_code,
  }: ICreateProductDTO): Promise<IReturnProductDTO> {
    const checkProductExists = await this.productRepository.findByCode(
      product_code
    )

    if (checkProductExists)
      throw new AppError('This product is already exists', 409)

    const createProduct = this.productRepository.create({
      name,
      value,
      weight,
      seller,
      store,
      product_code,
    })

    if (!createProduct) throw new AppError('Error in create a product', 500)

    return createProduct
  }
}
