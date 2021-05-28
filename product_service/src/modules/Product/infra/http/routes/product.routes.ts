import { Router } from 'express'

import Validate from '@shared/middlewares/Validate'
import productValidator from '@shared/validators/Product'

const productRouter = Router()

import ProductController from '../controllers/ProductController'
const productController = new ProductController()

productRouter.get('/', productController.index)
productRouter.post(
  '/',
  Validate(productValidator.create),
  productController.store
)

export default productRouter
