import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
	@IsEmail()
	email: string;

	@IsStrongPassword({
		minLength: 6,
	})
	password: string;
}
