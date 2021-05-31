import { Request, Response } from 'express'

import { SearchProductService } from '@modules/Product/services'
import ProductRepository from '@modules/Product/infra/mongoose/repositories/ProductRepository'

export default class SearchProductController {
  public async searchByCode(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { code, page } = request.query
    const { authorization } = request.headers
    const payload = {
      token: authorization,
      code,
      page,
    }

    const productRepository = new ProductRepository()
    const searchProduct = await new SearchProductService(
      productRepository
    ).execute(payload)

    return response.status(200).json(searchProduct)
  }
}
