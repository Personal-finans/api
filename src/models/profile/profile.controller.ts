import { BaseController } from '../../shared/base/base-controller';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './profile.service';

// @UseGuards(AuthGuard)
// @Controller('profiles')
export class ProfileController extends BaseController<Profile> {
	constructor(private readonly service: ProfileService) {
		super(service);
	}
	// constructor(private readonly profileService: ProfileService) {}
	// @Post()
	// async create(@Body() body: CreateProfileDTO, @User() user) {
	// 	return this.profileService.create(body, user);
	// }
	// @Get()
	// async list() {
	// 	return this.profileService.list();
	// }
	// @Get('/me')
	// async show(@User() user) {
	// 	return this.profileService.show(user.id);
	// }
	// @Put()
	// async update(@Body() body: UpdatePutProfileDTO, @User('id') userId: number) {
	// 	return this.profileService.update(userId, body);
	// }
	// @Patch()
	// async updatePartial(
	// 	@Body() body: UpdatePatchProfileDTO,
	// 	@User('id') userId: number,
	// ) {
	// 	return this.profileService.updatePartial(userId, body);
	// }
	// @Delete()
	// async delete(@User('id') userId: number) {
	// 	return this.profileService.delete(userId);
	// }
}
