import { Request, Response } from 'express'
import { ProductsServices } from '../services/ProductsServices'

export class ProductsController {
  async create (request: Request, response: Response): Promise<Response> {
    const productsServices = new ProductsServices()

    const { name, userID, categoryID } = request.body

    const product = await productsServices.create({ name, userID, categoryID })

    return response.status(201).json(product)
  }

  async findAll (request: Request, response: Response): Promise<Response> {
    const productsServices = new ProductsServices()

    const products = await productsServices.findAll()

    return response.status(200).json(products)
  }

  async findByUser (request: Request, response: Response): Promise<Response> {
    const productsServices = new ProductsServices()

    const { userID } = request.params

    const products = await productsServices.findByUser(userID)

    return response.status(200).json(products)
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const productsServices = new ProductsServices()

    const { id } = request.params

    await productsServices.delete(id)

    return response.status(204).json()
  }
}
