import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateProductsTable1658345656888 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'user_id',
            type: 'uuid'
          },
          {
            name: 'category_id',
            type: 'integer'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FK_user_id',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FK_category_id',
            referencedTableName: 'product_categories',
            referencedColumnNames: ['id'],
            columnNames: ['category_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }
}
