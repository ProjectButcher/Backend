import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { ProductCategory } from './ProductCategory'
import { User } from './User'

@Entity('products')
export class Product {
  @PrimaryColumn()
  readonly id: string

  @Column()
  readonly name: string

  @Column({ name: 'user_id' })
    userID: string

  @Column({ name: 'category_id' })
    categoryID: number

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
    user: User

  @OneToOne(() => ProductCategory)
  @JoinColumn({ name: 'category_id' })
    category: ProductCategory

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
