import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'

import SessionsController from './controllers/SessionsController'

import OrphanagesController from './controllers/OrphanagesController'
import UsersController from './controllers/UsersController'

// Index = List

const routes = Router()
const upload = multer(uploadConfig)

// Orphanages
routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.create)
routes.delete('/orphanages/:id', OrphanagesController.delete)

// Users
routes.get('/users', UsersController.index)
routes.get('/users/:id', UsersController.show)
routes.post('/users', UsersController.create)
routes.delete('/users/:id', UsersController.delete)

routes.post('/sessions', SessionsController.create)

export default routes
