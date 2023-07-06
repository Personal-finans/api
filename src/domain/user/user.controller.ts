import {
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
	Put,
} from '@nestjs/common';
import { ParamId } from 'src/decorators/param-id.decorator';
import { CreateUserDTO, UpdatePatchUserDTO, UpdatePutUserDTO } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() body: CreateUserDTO) {
		return this.userService.create(body);
	}

	@Get()
	async list() {
		return this.userService.list();
	}

	@Get(':id')
	async show(@ParamId('id') id: number) {
		return this.userService.show(id);
	}

	@Get(':id/profile')
	async showProfile(@ParamId('id') id: number) {
		return this.userService.showProfile(id);
	}

	@Put(':id')
	async update(@Body() body: UpdatePutUserDTO, @ParamId('id') id: number) {
		return this.userService.update(id, body);
	}

	@Patch(':id')
	async updatePartial(
		@Body() body: UpdatePatchUserDTO,
		@ParamId('id') id: number,
	) {
		return this.userService.updatePartial(id, body);
	}

	@Delete(':id')
	async delete(@ParamId('id') id: number) {
		return this.userService.delete(id);
	}
}
