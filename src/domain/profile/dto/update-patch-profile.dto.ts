import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDTO } from './create-profile.dto';

export class UpdatePatchProfileDTO extends PartialType(CreateProfileDTO) {}
