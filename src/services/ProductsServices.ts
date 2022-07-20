import { getCustomRepository } from 'typeorm'
import { Product } from '../entities/Product'
import { ProductsRepository } from '../repositories/ProductsRepository'

interface ICreateProductDTO {
  name: string
  userID: string
  categoryID: number
}

export class ProductsServices {
  async create ({ name, userID, categoryID }: ICreateProductDTO): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository)

    if (!name) {
      throw new Error('Name is required')
    }

    const productAlreadyExists = await productsRepository.findOne({ name })

    if (productAlreadyExists) {
      throw new Error('Product already exists')
    }

    const product = productsRepository.create({ name, userID, categoryID })

    await productsRepository.save(product)

    return product
  }

  async findAll (): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository)

    return productsRepository.find()
  }

  async findByUser (userID: string): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository)

    return productsRepository.find({ userID })
  }

  async delete (id: string): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository)

    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new Error('Product not found')
    }

    await productsRepository.remove(product)
  }
}
