import { Router } from 'express'
import { UsersController } from './controllers/UsersController'

const router = Router()

const usersController = new UsersController()
router.post('/users', usersController.create)
router.get('/users/:id', usersController.find)
router.get('/users/:id/address', usersController.getAddress)
router.put('/users/:id/address', usersController.changeAddress)
router.put('/users/:id/password_reset', usersController.changePassword)
router.delete('/users/:id', usersController.delete)

export { router }
