import { Request, Response } from 'express'

import { ShowProductService } from '@modules/Product/services'
import ProductRepository from '@modules/Product/infra/mongoose/repositories/ProductRepository'

export class SearchProductController {
  public async searchByCode(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params
    const { authorization } = request.headers
    const payload = {
      token: authorization,
      id,
    }

    const productRepository = new ProductRepository()
    const searchProduct = await new ShowProductService(
      productRepository
    ).execute(payload)

    return response.status(200).json(searchProduct)
  }
}
