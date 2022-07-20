import { Request, Response } from 'express'
import { AuthServices } from '../services/AuthServices'

export class AuthController {
  async login (request: Request, response: Response) {
    const { email, password } = request.body

    const authServices = new AuthServices()

    const token = await authServices.login({ email, password })

    return response.status(200).json(token)
  }
}
