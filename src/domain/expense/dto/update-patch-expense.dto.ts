import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDTO } from './create-expense.dto';

export class UpdatePatchExpenseDTO extends PartialType(CreateExpenseDTO) {}
