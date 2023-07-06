import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCardDTO {
	@IsNotEmpty()
	@IsString()
	bankName: string;

	@IsNumber()
	@IsNotEmpty()
	invoiceDueDate: number;
}
