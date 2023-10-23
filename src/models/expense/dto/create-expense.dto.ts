import {
	IsDate,
	IsDecimal,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class CreateExpenseDTO {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsNotEmpty()
	@IsDecimal()
	value: number;

	@IsNotEmpty()
	@IsNumber()
	numberOfInstallments: number;

	@IsDate()
	@IsNotEmpty()
	closesDay: Date;

	@IsNumber()
	@IsNotEmpty()
	paymentMethodId: number;
}
