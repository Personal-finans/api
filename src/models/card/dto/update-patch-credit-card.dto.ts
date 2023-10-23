import { PartialType } from '@nestjs/mapped-types';
import { CreateCreditCardDTO } from './create-credit-card.dto';

export class UpdatePatchCreditCardDTO extends PartialType(
	CreateCreditCardDTO,
) {}
