import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../models/user/entities/user.entity';
import { userEntityList } from './user-entity-list.mock';

export const userRepositoryMock = {
	provide: getRepositoryToken(User),
	useValue: {
		exist: jest.fn(),
		save: jest.fn().mockResolvedValue(userEntityList[0]),
		find: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	},
};
