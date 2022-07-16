import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: String

  @Column()
  firstName: String

  @Column()
  lastName: String

  @Column()
  orgName: String

  @Column({ enum: ['admin', 'user'] })
  userType: String

  @Column({ nullable: true })
  address: String

  @Column({ nullable: true })
  city: String

  @Column({ nullable: true })
  state: String

  @Column({ nullable: true })
  zip: String

  @Column({ nullable: true })
  country: String

  @Column({ unique: true })
  email: String

  @Column()
  password: String

  @Column()
  lastPassword: String

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
