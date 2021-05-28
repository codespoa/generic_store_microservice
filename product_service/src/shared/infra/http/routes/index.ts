import { Router } from 'express'
import productRouter from '@modules/Product/infra/http/routes/product.routes'

const routes = Router()

routes.use('/product', productRouter)

export { routes }
