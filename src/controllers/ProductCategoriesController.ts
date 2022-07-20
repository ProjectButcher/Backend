import { Request, Response } from 'express'
import { ProductCategoriesServices } from '../services/ProductCategoriesServices'

export class ProductCategoriesController {
  async create (request: Request, response: Response): Promise<Response> {
    const productCategoriesServices = new ProductCategoriesServices()

    const { name } = request.body

    const productCategory = await productCategoriesServices.create(name)

    return response.status(201).json(productCategory)
  }

  async findAll (request: Request, response: Response): Promise<Response> {
    const productCategoriesServices = new ProductCategoriesServices()

    const productCategories = await productCategoriesServices.findAll()

    return response.status(200).json(productCategories)
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const productCategoriesServices = new ProductCategoriesServices()

    const { id } = request.params

    await productCategoriesServices.delete(parseInt(id))

    return response.status(204).json()
  }
}
