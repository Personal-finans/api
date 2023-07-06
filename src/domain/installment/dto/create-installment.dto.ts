import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInstallmentDTO {
	@IsNotEmpty()
	@IsBoolean()
	paid: boolean;

	@IsNotEmpty()
	@IsNumber()
	value: number;

	@IsNotEmpty()
	@IsNumber()
	number: number;

	@IsNotEmpty()
	@IsDate()
	dueDate: Date;

	@IsNotEmpty()
	@IsNumber()
	expenseId: number;
}
