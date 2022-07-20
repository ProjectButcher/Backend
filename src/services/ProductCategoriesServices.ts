import { getCustomRepository } from 'typeorm'
import { ProductCategory } from '../entities/ProductCategory'
import { ProductCategoriesRepository } from '../repositories/ProductCategoriesRepository'

export class ProductCategoriesServices {
  async create (name: string): Promise<ProductCategory> {
    const productCategoriesRepository = getCustomRepository(ProductCategoriesRepository)

    if (!name) {
      throw new Error('Name is required')
    }

    const productCategoryAlreadyExists = await productCategoriesRepository.findOne({ name })

    if (productCategoryAlreadyExists) {
      throw new Error('Product category already exists')
    }

    const productCategory = productCategoriesRepository.create({ name })

    await productCategoriesRepository.save(productCategory)

    return productCategory
  }

  async findAll (): Promise<ProductCategory[]> {
    const productCategoriesRepository = getCustomRepository(ProductCategoriesRepository)

    return productCategoriesRepository.find()
  }

  async delete (id: number): Promise<void> {
    const productCategoriesRepository = getCustomRepository(ProductCategoriesRepository)

    const productCategory = await productCategoriesRepository.findOne(id)

    if (!productCategory) {
      throw new Error('Product category not found')
    }

    await productCategoriesRepository.remove(productCategory)
  }
}
