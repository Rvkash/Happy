import User from '../models/user'

export default {
	render(user: User) {
		return{
			"id": user.id,
    	"name": user.name,
			"senha": user.senha
		}
	},

		renderMany(users: User[]) {
			return users.map(user => this.render(user))
		}
	}
