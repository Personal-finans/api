import { User } from '../models/user/entities/user.entity';

export const userEntityList: Partial<User>[] = [
	{
		id: '1',
		email: 'giovanascarmagnani@gmail.com',
		password: '1234',
		status: true,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '2',
		email: 'guilhermescarmagnani@gmail.com',
		password: '1234',
		status: true,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '3',
		email: 'thaissascarmagnani@gmail.com',
		password: '1234',
		status: true,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];
