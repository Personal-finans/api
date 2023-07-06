import { PartialType } from '@nestjs/mapped-types';
import { CreateInstallmentDTO } from './create-installment.dto';

export class UpdatePatchInstallmentDTO extends PartialType(
	CreateInstallmentDTO,
) {}
