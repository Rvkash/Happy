import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import OrphanagesController from './controllers/OrphanagesController'
import UsersController from './controllers/UsersController'
// Index = List

const routes = Router()
const upload = multer(uploadConfig)

// Orphanages
routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.create)

// Users
routes.get('/users', UsersController.index)
routes.get('/users/:id', UsersController.show)
routes.post('/users', UsersController.create)

export default routes
