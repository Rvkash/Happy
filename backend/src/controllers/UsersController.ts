import { Request, Response} from 'express'
import { getConnection, getRepository } from 'typeorm'
import crypto from 'crypto'

import * as Yup from 'yup'

import userView from '../views/users_view'
import User from '../models/User'

export default {
	async index(request: Request , response: Response) {
		const usersRepository = getRepository(User)
		const users = await usersRepository.find({
    })

    if(!users){
      return response.status(400).json({ error: 'usuário não existe'})
    }

    return response.json(userView.renderMany(users))
    

	},
	async show(request: Request , response: Response) {
		const { id } = request.params 
		const usersRepository = getRepository(User)

		const user = await usersRepository.findOneOrFail(id, {

    })

		return response.json(userView.render(user))

	},                      
  async create(request: Request , response: Response) {
    const {  
      name, 
      email,
    } = request.body
    
    const password = crypto.randomBytes(4).toString('hex');
    
    const usersRepository = await getRepository(User)
    
    const data = {
      name,
      email,
      password
    }
    
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().min(6).required(),
    })

    await schema.validate(data, {
      abortEarly: false,
    })

    const user = usersRepository.create(data)

    await usersRepository.save(user)

    return response.status(201).json(user)
  },
  async delete(request: Request , response: Response) {
    const { id } = request.params

     await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", {id})
    .execute();


    return response.json(User) 
  }
}