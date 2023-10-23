import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCreditCardDTO {
	@IsNotEmpty()
	@IsString()
	accountName: string;

	@IsDecimal()
	@IsNotEmpty()
	limit: number;

	@IsNumber()
	@IsNotEmpty()
	closesDay: number;

	@IsNumber()
	@IsNotEmpty()
	expirationDay: number;

	@IsNumber()
	@IsNotEmpty()
	financialInstitutionId: number;

	@IsNumber()
	profileId?: number;

	@IsNumber()
	id?: number;
}
