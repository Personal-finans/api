import { User } from '../models/user/entities/user.entity';

export const createUserDTO: Partial<User> = {
	email: 'guilhermescarmagnani@gmail.com',
	password: '1234',
};
