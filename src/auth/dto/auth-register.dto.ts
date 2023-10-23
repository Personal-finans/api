import { IsString } from 'class-validator';
import { CreateUserDTO } from 'src/models/user/dto/create-user.dto';

export class AuthRegisterDTO extends CreateUserDTO {
	@IsString()
	name: string;
}
