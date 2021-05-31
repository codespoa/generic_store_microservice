import { AppError } from '@shared/error'
import IProductRepository from '@modules/Product/repositories/IProductRepository'
import { ICreateProductDTO, IReturnProductDTO } from '@modules/Product/dtos'
import Service from '@shared/protocols/Service'
import { JwtDecode, RoleCheck } from '@shared/utils'

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
    if (!token || token === 'Bearer')
      throw new AppError(
        "You don't have permission to access this feature",
        403
      )
    const [, auth] = token.split(' ')

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

    return createProduct
  }
}
