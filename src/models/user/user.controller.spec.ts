/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../guards/auth.guard';
import { guardMock } from '../../testing/guard.mock';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
	let userController: UserController;
	let userService: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [],
		})
			.overrideGuard(AuthGuard)
			.useValue(guardMock)
			.compile();

		userController = module.get<UserController>(UserController);
		userService = module.get<UserService>(UserService);

		test('Validar a definição', () => {
			expect(UserController).toBeDefined();
			expect(UserService).toBeDefined();
		});
	});
});
