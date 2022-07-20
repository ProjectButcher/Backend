import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { v4 as uuid } from 'uuid'

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity('users')
export class User {
  @PrimaryColumn()
  readonly id: string

  @Column({ name: 'first_name' })
    firstName: string

  @Column({ name: 'last_name' })
    lastName: string

  @Column({ name: 'org_name' })
    orgName: string

  @Column({
    name: 'user_type',
    type: 'enum',
    enum: UserType,
    default: UserType.USER
  })
    userType: string

  @Column({ nullable: true })
    address: string

  @Column({ nullable: true })
    city: string

  @Column({ nullable: true })
    state: string

  @Column({ nullable: true })
    zip: string

  @Column({ nullable: true })
    country: string

  @Column({ unique: true })
    email: string

  @Column()
    password: string

  @Column({ name: 'last_password' })
    lastPassword: string

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
