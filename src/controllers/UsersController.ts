import { Request, Response } from 'express'
import { UsersServices } from '../services/UsersServices'

export class UsersController {
  async create (request: Request, response: Response): Promise<Response> {
    const usersServices = new UsersServices()

    const {
      firstName,
      lastName,
      orgName,
      userType,
      address,
      city,
      state,
      zip,
      country,
      email,
      password
    } = request.body

    const user = await usersServices.create({
      firstName,
      lastName,
      orgName,
      userType,
      address,
      city,
      state,
      zip,
      country,
      email,
      password
    })

    return response.status(201).json(user)
  }

  async find (request: Request, response: Response): Promise<Response> {
    const usersServices = new UsersServices()

    const { id } = request.params

    const user = await usersServices.find(id)

    return response.status(200).json(user)
  }

  async getAddress (request: Request, response: Response): Promise<Response> {
    const usersServices = new UsersServices()

    const { id } = request.params

    const address = await usersServices.getAddress(id)

    return response.status(200).json(address)
  }

  async changeAddress (request: Request, response: Response): Promise<Response> {
    const usersServices = new UsersServices()

    const { id } = request.params
    const { address, city, state, zip, country } = request.body

    const user = await usersServices.changeAddress(id, address, city, state, zip, country)

    return response.status(204).json(user)
  }

  async changePassword (request: Request, response: Response): Promise<Response> {
    const usersServices = new UsersServices()

    const { id } = request.params
    const { newPassword } = request.body

    await usersServices.changePassword(id, newPassword)

    return response.status(204).json()
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const usersServices = new UsersServices()

    const { id } = request.params

    await usersServices.delete(id)

    return response.status(204).json()
  }
}
