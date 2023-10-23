import { Injectable, NotFoundException } from '@nestjs/common';
import { CreditCard, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';
import {
	CreateCreditCardDTO,
	UpdatePatchCreditCardDTO,
	UpdatePutCreditCardDTO,
} from './dto';

@Injectable()
export class CreditCardService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
	) {}

	async create(
		{
			accountName,
			closesDay,
			expirationDay,
			financialInstitutionId,
			limit,
		}: CreateCreditCardDTO,
		profileId: number,
	): Promise<CreditCard> {
		const data: any = {
			accountName,
			closesDay,
			expirationDay,
			financialInstitutionId,
			limit: new Prisma.Decimal(limit),
			profileId,
		};

		return this.prismaService.creditCard.create({
			data,
		});
	}

	async list(profileId: number): Promise<CreditCard[]> {
		return this.prismaService.creditCard.findMany({
			where: { profileId },
		});
	}

	async show(id: number): Promise<CreditCard> {
		await this.exists(id);
		return this.prismaService.creditCard.findUnique({ where: { id } });
	}

	async update(id: number, data: UpdatePutCreditCardDTO) {
		await this.exists(id);

		return await this.prismaService.creditCard.update({
			where: { id },
			data,
		});
	}

	async updatePartial(
		id: number,
		{
			accountName,
			closesDay,
			expirationDay,
			financialInstitutionId,
			limit,
		}: UpdatePatchCreditCardDTO,
	): Promise<CreditCard> {
		await this.exists(id);

		const data: any = {};
		if (accountName) data.accountName = accountName;
		if (closesDay) data.closesDay = closesDay;
		if (expirationDay) data.expirationDay = expirationDay;
		if (financialInstitutionId)
			data.financialInstitutionId = financialInstitutionId;
		if (limit) data.limit = limit;

		return this.prismaService.creditCard.update({
			where: { id },
			data,
		});
	}

	async delete(id: number): Promise<CreditCard> {
		await this.exists(id);
		return this.prismaService.creditCard.delete({ where: { id } });
	}

	async exists(id: number): Promise<void> {
		const isUserExists = await this.prismaService.creditCard.count({
			where: { id },
		});

		if (!isUserExists) {
			throw new NotFoundException(`O Cartão de Credito ${id} não existe.`);
		}
	}
}
