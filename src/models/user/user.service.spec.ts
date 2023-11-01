/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { createUserDTO } from '../../testing/create-user-dto.mock';
import { userEntityList } from '../../testing/user-entity-list.mock';
import { userRepositoryMock } from '../../testing/user-respository.mock';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
	let userService: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService, UserRepository, Repository, userRepositoryMock],
		}).compile();

		userService = module.get<UserService>(UserService);
	});

	test('Validar a definição', () => {
		expect(UserService).toBeDefined();
	});

	describe('Create', () => {
		test('Method Create', async () => {
			const result = await userService.create(createUserDTO);

			expect(result).toEqual(userEntityList[0]);
		});
	});

	describe('Read', () => {});

	describe('Update', () => {});

	describe('Delte', () => {});
});
