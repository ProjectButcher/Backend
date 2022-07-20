import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export function ensureAuthenticated (request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authToken.split(' ')

  try {
    const { sub } = verify(token, '3c6c255b98e7b1c909501d809267126d') as IPayload

    request.userID = sub

    return next()
  } catch (error) {
    return response.status(401).json({ error: 'Invalid token' })
  }
}
