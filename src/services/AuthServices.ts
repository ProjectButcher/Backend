import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { UsersRepository } from '../repositories/UsersRepository'

interface ILoginRequest {
  email: string;
  password: string;
}

export class AuthServices {
  async login ({ email, password }: ILoginRequest) {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne({ email })

    if (!user) {
      throw new Error('User not found')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Invalid password')
    }

    const token = sign({
      email: user.email
    }, '3c6c255b98e7b1c909501d809267126d', {
      subject: user.id,
      expiresIn: '1d'
    })

    const data = {
      user,
      token
    }

    return data
  }
}
