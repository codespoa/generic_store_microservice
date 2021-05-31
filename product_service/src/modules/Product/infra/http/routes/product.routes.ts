import { Router } from 'express'

import Validate from '@shared/middlewares/Validate'
import productValidator from '@shared/validators/Product'
import ensureAuthenticad from '@modules/Product/infra/http/middleware/ensureAuthenticad'

const productRouter = Router()

import {
  ProductController,
  SearchProductController,
} from '@modules/Product/infra/http/controllers'
const productController = new ProductController()
const searchProductController = new SearchProductController()

productRouter.get('/', ensureAuthenticad, productController.index)
productRouter.delete('/:id', ensureAuthenticad, productController.delete)
productRouter.get('/search', ensureAuthenticad, searchProductController.search)
productRouter.get('/:id', ensureAuthenticad, productController.show)
productRouter.post(
  '/',
  ensureAuthenticad,
  Validate(productValidator.create),
  productController.store
)
productRouter.put(
  '/:id',
  ensureAuthenticad,
  Validate(productValidator.create),
  productController.update
)

export default productRouter
