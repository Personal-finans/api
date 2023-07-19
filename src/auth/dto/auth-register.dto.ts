import { IsString } from 'class-validator';
import { CreateUserDTO } from 'src/domain/user/dto/create-user.dto';

export class AuthRegisterDTO extends CreateUserDTO {
	@IsString()
	name: string;
}
