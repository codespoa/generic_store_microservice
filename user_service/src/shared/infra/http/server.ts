import 'reflect-metadata'
import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'
import { MongoHelper } from '@shared/infra/http/mongo/helper/mongo-helper'
import { AppError } from '@shared/error'
import routes from '@shared/infra/http/routes/index'
import mongoConfig from '@config/mongo'
import { bodyParser } from '@shared/middlewares/BodyParser'
import { contentType } from '@shared/middlewares/ContentType'

const app = express()
app.use(cors())

app.use(bodyParser)
app.use(contentType)
app.use(routes)

MongoHelper.connect(mongoConfig.mongoUrl)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.errorCode).json({
      status: err.errorCode,
      message: err.errorMessage,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: err,
  })
})

app.listen(process.env.APP_PORT, () => {
  console.log(
    '\x1b[32m',
    `[API] Server listening on http://localhost:${process.env.APP_PORT}`
  )
})
