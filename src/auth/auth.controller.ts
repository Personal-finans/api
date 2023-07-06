import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';
import { AuthLoginDTO, AuthRegisterDTO } from './dto';

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

	@UseGuards(AuthGuard)
	@Post('me')
	async me(@User() user) {
		return { user };
	}
}
