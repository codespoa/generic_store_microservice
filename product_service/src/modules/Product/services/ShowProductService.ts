import { AppError } from '@shared/error'
import IProductRepository from '@modules/Product/repositories/IProductRepository'
import { IReturnProductDTO } from '@modules/Product/dtos'
import Service from '@shared/protocols/Service'
import JwtDecode from '@shared/utils/JwtDecode'

export class ShowProductService implements Service {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(
    payload: any
  ): Promise<IReturnProductDTO[] | IReturnProductDTO | undefined> {
    if (!payload.token || payload.token === 'Bearer')
      throw new AppError(
        "You don't have permission to access this feature",
        403
      )
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

    const checkProductExists = await this.productRepository.findByCode(
      payload.code
    )

    if (!checkProductExists) throw new AppError('Product not found', 404)

    const products = await this.productRepository.getAllByCode(payload)

    return products
  }
}
