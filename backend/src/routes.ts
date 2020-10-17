import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import OrphanagesController from './controllers/OrphanagesController'
import UserController from './controllers/UsersController'
// Index = List

const routes = Router()
const upload = multer(uploadConfig)

// Orphanages
routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.create)

// Users
routes.post('/users', UserController.create)
routes.get('/users/:id', UserController.show)

export default routes
