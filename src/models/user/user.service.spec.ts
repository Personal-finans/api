/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createUserDTO } from '../../testing/create-user-dto.mock';
import { userEntityList } from '../../testing/user-entity-list.mock';
import { userRepositoryMock } from '../../testing/user-respository.mock';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
	let userService: UserService;
	let userRepository: UserRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService, UserRepository, userRepositoryMock],
		}).compile();

		userService = module.get<UserService>(UserService);
		userRepository = module.get(getRepositoryToken(UserRepository));
	});

	test('Validar a definição', () => {
		expect(UserService).toBeDefined();
		expect(UserRepository).toBeDefined();
	});

	describe('Create', () => {
		test('Method Create', async () => {
			const result = await userService.create(createUserDTO);

			expect(result).toEqual(userEntityList[0]);
		});
	});

	describe('Read', () => {
		test('Method list', async () => {
			const result = await userService.findAll();

			expect(result).toEqual(userEntityList);
		});

		test('Method show', async () => {
			const result = await userService.findById('1');

			expect(result).toEqual(userEntityList[0]);
		});
	});

	describe('Update', () => {
		test('Method update', async () => {
			const result = await userService.update('1', userEntityList[0]);

			expect(result).toEqual(userEntityList[0]);
		});

		test('Method updatePartial', async () => {
			const result = await userService.findById('1');

			expect(result).toEqual(userEntityList[0]);
		});
	});

	describe('Delete', () => {
		test('Method delete', async () => {
			const result = await userService.delete('1');

			expect(result).toEqual(userEntityList[0]);
		});

		test('Method softdelete', async () => {
			const result = await userRepository.softDelete('1');

			expect(result).toEqual(userEntityList[0]);
		});
	});
});
