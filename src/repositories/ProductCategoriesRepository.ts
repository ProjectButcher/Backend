import { EntityRepository, Repository } from 'typeorm'
import { ProductCategory } from '../entities/ProductCategory'

@EntityRepository(ProductCategory)
export class ProductCategoriesRepository extends Repository<ProductCategory> {}
