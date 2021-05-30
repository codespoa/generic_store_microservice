import IProductRepository from '@modules/Product/repositories/IProductRepository'
import IReturnProductDTO from '@modules/Product/dtos/IReturnProductDTO'
import Service from '@shared/protocols/Service'

export class IndexProductService implements Service {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(): Promise<IReturnProductDTO[] | undefined> {
    const checkProductExists = await this.productRepository.getAll()

    return checkProductExists
  }
}
