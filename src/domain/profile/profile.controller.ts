import {
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdatePatchProfileDTO } from './dto/update-patch-profile.dto';
import { UpdatePutProfileDTO } from './dto/update-put-profile.dto';
import { ProfileService } from './profile.service';

@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Post()
	async create(@Body() body: CreateProfileDTO, @User() user) {
		return this.profileService.create(body, user);
	}

	@Get()
	async list() {
		return this.profileService.list();
	}

	@Get('/me')
	async show(@User() user) {
		return this.profileService.show(user.id);
	}

	@Put()
	async update(@Body() body: UpdatePutProfileDTO, @User('id') userId: number) {
		return this.profileService.update(userId, body);
	}

	@Patch()
	async updatePartial(
		@Body() body: UpdatePatchProfileDTO,
		@User('id') userId: number,
	) {
		return this.profileService.updatePartial(userId, body);
	}

	@Delete()
	async delete(@User('id') userId: number) {
		return this.profileService.delete(userId);
	}
}
