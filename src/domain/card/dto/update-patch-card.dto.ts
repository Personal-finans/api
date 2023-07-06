import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDTO } from './create-card.dto';

export class UpdatePatchCardDTO extends PartialType(CreateCardDTO) {}
