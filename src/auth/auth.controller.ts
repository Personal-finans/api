import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { User as UserModel } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { AuthService } from './auth.service';
import {
	AuthForgetDTO,
	AuthLoginDTO,
	AuthRegisterDTO,
	AuthResetDTO,
} from './dto';

@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() { email, password }: AuthLoginDTO) {
		return this.authService.login(email, password);
	}

	@Post('register')
	async register(@Body() body: AuthRegisterDTO) {
		return this.authService.register(body);
	}

	@Post('forget')
	async forget(@Body() { email }: AuthForgetDTO) {
		return this.authService.forget(email);
	}

	@Post('reset')
	async reset(@Body() { password, token }: AuthResetDTO) {
		return this.authService.reset(password, token);
	}

	@UseGuards(AuthGuard)
	@Get('me')
	async me(@User() user: UserModel) {
		return { user };
	}
}
