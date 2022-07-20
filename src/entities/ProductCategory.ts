import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('product_categories')
export class ProductCategory {
  @PrimaryColumn()
  readonly id: string

  @Column()
    name: string

  @CreateDateColumn({ name: 'created_at' })
    createdAt: string

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string
}
