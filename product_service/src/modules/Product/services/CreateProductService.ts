import { AppError } from '@shared/error'
import IProductRepository from '@modules/Product/repositories/IProductRepository'
import ICreateProductDTO from '@modules/Product/dtos/ICreateProductDTO'
import IReturnProductDTO from '@modules/Product/dtos/IReturnProductDTO'
import Service from '@shared/protocols/Service'
import JwtDecode from '@shared/utils/JwtDecode'
import tokenExample from '@config/token'

export class CreateProductService implements Service {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute({
    name,
    value,
    weight,
    seller,
    store,
    product_code,
    token,
  }: ICreateProductDTO): Promise<IReturnProductDTO> {
    const [, auth] = token.split(' ')

    const checkProductExists = await this.productRepository.findByCode(
      product_code
    )

    const decoder = new JwtDecode()

    if (!auth)
      throw new AppError(
        "You don't have permission to access this feature",
        403
      )

    const {
      subject: { user_role },
    } = decoder.decode(auth)

    if (user_role !== 'gerente')
      throw new AppError(
        "You don't have permission to access this feature",
        403
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
