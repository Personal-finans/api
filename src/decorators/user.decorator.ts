import {
	ExecutionContext,
	NotFoundException,
	createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator(
	(args: string, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest();

		if (request.user) {
			if (args) {
				return request.user[args];
			}
			return request.user;
		} else {
			throw new NotFoundException(
				'Usuario não encontrado no Request. Use o AuthGuard para obter o usuário.',
			);
		}
	},
);
