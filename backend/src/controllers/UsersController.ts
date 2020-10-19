import { Request, Response} from 'express'
import { getConnection, getRepository } from 'typeorm'
import * as Yup from 'yup'

import userView from '../views/users_view'
import User from '../models/User'

export default {
	async index(request: Request , response: Response) {
		const usersRepository = getRepository(User)
		const users = await usersRepository.find({
    })

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

      const {  name, email, senha } = request.body

      const usersRepository = getRepository(User)


      const data = {
        name,
        email,
        senha
      }

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        senha: Yup.string().required(),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      const user = usersRepository.create(data)

      await usersRepository.save(user)

      return response.status(201).json(user)
  },
}