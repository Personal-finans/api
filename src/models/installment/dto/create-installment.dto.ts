import {
	IsBoolean,
	IsDate,
	IsDecimal,
	IsNotEmpty,
	IsNumber,
} from 'class-validator';

export class CreateInstallmentDTO {
	@IsNotEmpty()
	@IsDecimal()
	value: number;

	@IsNotEmpty()
	@IsBoolean()
	paid: boolean;

	@IsNotEmpty()
	@IsNumber()
	number: number;

	@IsNotEmpty()
	@IsDate()
	closesDay: Date;

	@IsNotEmpty()
	@IsNumber()
	expenseId: number;
}
