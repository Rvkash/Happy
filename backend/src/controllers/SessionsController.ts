import {Request, Response } from 'express'
import User from '../models/User'
import {getRepository} from "typeorm";

export default {
	async create(request: Request, response: Response){
		const { password } = request.body

		const user = await getRepository(User)
		.createQueryBuilder("user")
    .where("user.password = :password", { password })
    .getOne();
		
		if(!user) {
			return response.status(400).json({ message: 'Senha não encontrada'})
		}

		return response.json(user) 

	}
}