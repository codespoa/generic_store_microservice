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
  Validate(productValidator.create),
  productController.store
)

export default productRouter
