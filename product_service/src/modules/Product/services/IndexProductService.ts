import IProductRepository from '@modules/Product/repositories/IProductRepository'
import { IReturnProductDTO } from '@modules/Product/dtos'
import Service from '@shared/protocols/Service'

export class IndexProductService implements Service {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(payload: any): Promise<IReturnProductDTO[] | undefined> {
    const checkProductExists = await this.productRepository.getAll(payload)

    return checkProductExists
  }
}
