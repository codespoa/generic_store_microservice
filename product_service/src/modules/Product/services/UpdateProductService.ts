import { AppError } from '@shared/error'
import IProductRepository from '@modules/Product/repositories/IProductRepository'
import IUpdateProductDTO from '@modules/Product/dtos/IUpdateProductDTO'
import IReturnUpdateProductDTO from '@modules/Product/dtos/IReturnUpdateProductDTO'
import Service from '@shared/protocols/Service'
import JwtDecode from '@shared/utils/JwtDecode'

export class UpdateProductService implements Service {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(
    payload: IUpdateProductDTO
  ): Promise<IReturnUpdateProductDTO> {
    const [, auth] = payload.token.split(' ')

    const decoder = new JwtDecode()

    const {
      subject: { user_role },
    } = decoder.decode(auth)

    if (user_role !== 'gerente')
      throw new AppError(
        "You don't have permission to access this feature",
        403
      )

    const checkProductExists = await this.productRepository.findById(payload.id)

    if (!checkProductExists) throw new AppError('Product not found', 404)

    const createProduct = this.productRepository.update(payload.id, payload)

    return createProduct
  }
}
