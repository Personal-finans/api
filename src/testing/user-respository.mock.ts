import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../models/user/repositories/user.repository';
import { userEntityList } from './user-entity-list.mock';

export const userRepositoryMock = {
	provide: getRepositoryToken(UserRepository),
	useValue: {
		exist: jest.fn(),
		save: jest.fn().mockResolvedValue(userEntityList[0]),
		find: jest.fn().mockResolvedValue(userEntityList),
		findOne: jest.fn().mockResolvedValue(userEntityList[0]),
		update: jest.fn(),
		delete: jest.fn(),
	},
};
