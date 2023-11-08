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
			'Senha utilizado no login, deve conter pelo menos 6 caracteres, 1 letra maiuscula, e 1 algum caractere especial',
		example: 'Usuario123@',
	})
	@IsStrongPassword({
		minLength: 6,
	})
	password: string;
}
