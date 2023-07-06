import {
	IsDate,
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
	@IsNumber()
	totalValue: number;

	@IsNotEmpty()
	@IsNumber()
	numberOfInstallments: number;

	@IsDate()
	@IsNotEmpty()
	dueDate: Date;
}
