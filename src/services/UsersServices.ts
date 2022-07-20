import { compare, hash } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { User } from '../entities/User'
import { UsersRepository } from '../repositories/UsersRepository'

interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  orgName: string;
  userType: string | 'admin' | 'user';
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  email: string;
  password: string;
}

interface UserAddress {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export class UsersServices {
  async create ({
    firstName,
    lastName,
    orgName,
    userType,
    address,
    city,
    state,
    zip,
    country,
    email,
    password
  }: ICreateUserDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    if (!email) {
      throw new Error('Email is required')
    }

    const userAlreadyExists = await usersRepository.findOne({ email })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    if (!password) {
      throw new Error('Password is required')
    }

    if (!firstName || !lastName || !orgName || !userType) {
      throw new Error('Some required fields are missing')
    }

    if (userType !== 'admin' && userType !== 'user') {
      throw new Error('User type must be \'admin\' or \'user\'')
    }

    const encryptedPassword = await hash(password, 8)

    const user = usersRepository.create({
      firstName,
      lastName,
      orgName,
      userType,
      address,
      city,
      state,
      zip,
      country,
      email,
      password: encryptedPassword
    })

    await usersRepository.save(user)

    return user
  }

  async find (id: string): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne(id)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  async getAddress (id: string): Promise<UserAddress> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne(id)

    if (!user) {
      throw new Error('User not found')
    }

    const address = {
      address: user.address,
      city: user.city,
      state: user.state,
      zip: user.zip,
      country: user.country
    }

    return address
  }

  async changeAddress (id: string, address: string, city: string, state: string, zip: string, country: string): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne(id)

    if (!user) {
      throw new Error('User not found')
    }

    user.address = address
    user.city = city
    user.state = state
    user.zip = zip
    user.country = country

    await usersRepository.save(user)

    return user
  }

  async changePassword (id: string, password: string): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne(id)

    if (!user) {
      throw new Error('User not found')
    }

    if (!password) {
      throw new Error('Password is required')
    }

    const passwordRepeat = await compare(password, user.password)

    if (passwordRepeat) {
      throw new Error('The new password must be different from the old one')
    }

    const encryptedPassword = await hash(password, 8)

    user.lastPassword = user.password
    user.password = encryptedPassword

    await usersRepository.save(user)
  }

  async delete (id: string): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne(id)

    if (!user) {
      throw new Error('User not found')
    }

    await usersRepository.remove(user)
  }
}
