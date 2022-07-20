import { Router } from 'express'
import { AuthController } from './controllers/AuthController'
import { ProductCategoriesController } from './controllers/ProductCategoriesController'
import { ProductsController } from './controllers/ProductsController'
import { UsersController } from './controllers/UsersController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { ensureAdmin } from './middlewares/ensureAdmin'

const router = Router()

const authController = new AuthController()
router.post('/login', authController.login)

const usersController = new UsersController()
router.post('/users', usersController.create)
router.get('/users/:id', ensureAuthenticated, usersController.find)
router.get('/users/:id/address', ensureAuthenticated, usersController.getAddress)
router.put('/users/:id/address', ensureAuthenticated, usersController.changeAddress)
router.put('/users/:id/password_reset', usersController.changePassword)
router.delete('/users/:id', ensureAuthenticated, ensureAdmin, usersController.delete)

const productsController = new ProductsController()
router.post('/products', ensureAuthenticated, productsController.create)
router.get('/products', ensureAuthenticated, productsController.findAll)
router.get('/products/:userID', ensureAuthenticated, productsController.findByUser)
router.delete('/products/:id', ensureAuthenticated, productsController.delete)

const productCategoriesController = new ProductCategoriesController()
router.post('/product_categories', ensureAuthenticated, ensureAdmin, productCategoriesController.create)
router.get('/product_categories', ensureAuthenticated, ensureAdmin, productCategoriesController.findAll)
router.delete('/product_categories/:id', ensureAuthenticated, ensureAdmin, productCategoriesController.delete)

export { router }
