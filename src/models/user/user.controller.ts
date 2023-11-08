import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '../../guards/auth.guard';
import { CreateUserDTO, UpdatePutUserDTO } from './dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard)
// @UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get(':id')
	async findById(@Param('id') id: string): Promise<User> {
		return this.userService.findById(id);
	}

	@Post()
	async create(@Body() data: CreateUserDTO): Promise<User> {
		return this.userService.create(data);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() data: UpdatePutUserDTO,
	): Promise<User> {
		return this.userService.update(id, data);
	}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<DeleteResult> {
		return this.userService.delete(id);
	}
}
