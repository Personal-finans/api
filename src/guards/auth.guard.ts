import {
	CanActivate,
	ExecutionContext,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../models/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const { authorization } = request.headers;
		const token = (authorization ?? '').split(' ')[1];

		try {
			const data = await this.authService.checkToken(token);
			request.tokenPayload = data;
			request.user = await this.userService.findById(data.id);

			return true;
		} catch (error) {
			throw new NotFoundException('Token Invalido');
		}
	}
}
