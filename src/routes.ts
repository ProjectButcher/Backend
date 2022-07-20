import { Router } from 'express'
import { ProductCategoriesController } from './controllers/ProductCategoriesController'
import { ProductsController } from './controllers/ProductsController'
import { UsersController } from './controllers/UsersController'

const router = Router()

const usersController = new UsersController()
router.post('/users', usersController.create)
router.get('/users/:id', usersController.find)
router.get('/users/:id/address', usersController.getAddress)
router.put('/users/:id/address', usersController.changeAddress)
router.put('/users/:id/password_reset', usersController.changePassword)
router.delete('/users/:id', usersController.delete)

const productsController = new ProductsController()
router.post('/products', productsController.create)
router.get('/products', productsController.findAll)
router.get('/products/:userID', productsController.findByUser)
router.delete('/products/:id', productsController.delete)

const productCategoriesController = new ProductCategoriesController()
router.post('/product_categories', productCategoriesController.create)
router.get('/product_categories', productCategoriesController.findAll)
router.delete('/product_categories/:id', productCategoriesController.delete)

export { router }
