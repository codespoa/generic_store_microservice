import { Request, Response } from 'express'

import {
  CreateProductService,
  IndexProductService,
  UpdateProductService,
  ShowProductService,
  DeleteProductService,
} from '@modules/Product/services'
import ProductRepository from '@modules/Product/infra/mongoose/repositories/ProductRepository'
import { Controller } from '@shared/protocols'

export class ProductController implements Controller {
  public async index(request: Request, response: Response): Promise<any> {
    let { page } = request.query

    const payload = {
      limit: 15,
      page,
    }

    const productRepository = new ProductRepository()
    const showManyProducts = await new IndexProductService(
      productRepository
    ).execute(payload)

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

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { authorization } = request.headers
    const payload = {
      token: authorization,
      id,
    }

    const productRepository = new ProductRepository()
    const showAProduct = await new ShowProductService(
      productRepository
    ).execute(payload)

    return response.status(200).json(showAProduct)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { authorization } = request.headers
    const payload = {
      token: authorization,
      id,
    }

    const productRepository = new ProductRepository()
    const t = await new DeleteProductService(productRepository).execute(payload)

    return response.status(200).json(t)
  }
}
