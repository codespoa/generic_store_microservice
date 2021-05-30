import { Request, Response } from 'express'

import {
  CreateProductService,
  IndexProductService,
  UpdateProductService,
} from '@modules/Product/services'
import ProductRepository from '@modules/Product/infra/mongoose/repositories/ProductRepository'
import { Controller } from '@shared/protocols'

export default class ProductController implements Controller {
  public async index(request: Request, response: Response): Promise<any> {
    const productRepository = new ProductRepository()
    const showManyProducts = await new IndexProductService(
      productRepository
    ).execute()

    return response.status(200).json(showManyProducts)
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const payload = request.body
    const { authorization } = request.headers

    payload.token = authorization

    const productRepository = new ProductRepository()
    const createAProduct = await new CreateProductService(
      productRepository
    ).execute(payload)

    return response.status(200).json(createAProduct)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const payload = request.body
    const { id } = request.params
    const { authorization } = request.headers
    payload.token = authorization
    payload.id = id

    const productRepository = new ProductRepository()
    const updateAProduct = await new UpdateProductService(
      productRepository
    ).execute(payload)

    return response.status(200).json(updateAProduct)
  }

  show(request: Request, response: Response): Promise<Response> {
    return new Promise((resolve) => resolve(null))
  }
  delete(request: Request, response: Response): Promise<Response> {
    return new Promise((resolve) => resolve(null))
  }
}
