import { AppError } from '@shared/error'
import IProductRepository from '@modules/Product/repositories/IProductRepository'
import Service from '@shared/protocols/Service'
import { JwtDecode, RoleCheck } from '@shared/utils'

export class DeleteProductService implements Service {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(payload: any): Promise<any> {
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

    const roleCheck = new RoleCheck()
    const checkRole = roleCheck.verify(user_role, ['gerente'])

    if (!checkRole)
      throw new AppError(
        "You don't have permission to access this feature",
        403
      )

    const checkProductExists = await this.productRepository.findById(payload.id)

    if (!checkProductExists) throw new AppError('Product not found', 404)

    await this.productRepository.delete(payload.id)
  }
}
