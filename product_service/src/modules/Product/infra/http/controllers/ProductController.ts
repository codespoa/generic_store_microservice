import { Request, Response } from 'express'

import { CreateProductService } from '@modules/Product/services'
import ProductRepository from '@modules/Product/infra/mongoose/repositories/ProductRepository'
import { Controller } from '@shared/protocols'

export default class ProductController implements Controller {
  public async index(request: Request, response: Response): Promise<Response> {
    return new Promise((resolve) => resolve(null))
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const payload = request.body

    const productRepository = new ProductRepository()
    const createAProduct = await new CreateProductService(
      productRepository
    ).execute(payload)

    return response.status(200).json(createAProduct)
  }

  show(request: Request, response: Response): Promise<Response> {
    return new Promise((resolve) => resolve(null))
  }
  delete(request: Request, response: Response): Promise<Response> {
    return new Promise((resolve) => resolve(null))
  }
  update(request: Request, response: Response): Promise<Response> {
    return new Promise((resolve) => resolve(null))
  }
}
