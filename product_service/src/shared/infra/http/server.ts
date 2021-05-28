import 'reflect-metadata'
import 'dotenv/config'
import 'express-async-errors'
import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'

import {
  MongoHelper,
  AppError,
  routes,
  bodyParser,
  contentType,
  mongoConfig,
} from '.'

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
