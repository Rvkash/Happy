import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('users')

export default class User {
	@PrimaryGeneratedColumn('increment')
	id: number;
	
	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	UserSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  },

  generateToken() {
    return jwt.sign({ id: this.id }, "secret", {
      expiresIn: 86400
    });
  }
};


}

