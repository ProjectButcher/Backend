import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'

export async function ensureAdmin (request: Request, response: Response, next: NextFunction) {
  const { userID } = request

  const usersRepository = getCustomRepository(UsersRepository)

  const { userType } = await usersRepository.findOne(userID)

  if (userType === 'admin') {
    return next()
  }

  return response.status(401).json({
    error: 'You must be an admin to perform this action'
  })
}
