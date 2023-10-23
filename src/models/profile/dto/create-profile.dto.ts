import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProfileDTO {
	@IsOptional()
	@IsNumber()
	userId?: number;

	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	photoUrl: string;

	@IsOptional()
	@IsString()
	bio: string;
}
