import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
	@ApiProperty({
		description: 'Email utilizado no login',
		example: 'usuario@usuario.com',
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		description:
			'Senha utilizado no login, deve conter pelo menos 6 caracteres',
		example: 'usuario123',
	})
	@IsStrongPassword({
		minLength: 6,
	})
	password: string;
}
