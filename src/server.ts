import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'

import { router } from './routes'
import './database'

const app = express()
app.set('env', process.env.APP_ENV)
app.set('port', process.env.APP_PORT)

app.use(cors())
app.use(express.json())
app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message
      })
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)

app.listen(app.get('port'), () => {
  console.log(`API - Butcher | Iniciada na porta ${app.get('port')}`)
})
