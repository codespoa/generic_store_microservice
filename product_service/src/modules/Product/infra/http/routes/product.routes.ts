import { Router } from 'express'

import Validate from '@shared/middlewares/Validate'
import productValidator from '@shared/validators/Product'
import ensureAuthenticad from '@modules/Product/infra/http/middleware/ensureAuthenticad'

const productRouter = Router()

import ProductController from '../controllers/ProductController'
const productController = new ProductController()

productRouter.get('/', ensureAuthenticad, productController.index)
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
