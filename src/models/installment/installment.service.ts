import { Injectable, NotFoundException } from '@nestjs/common';
import { Installment, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import {
	CreateInstallmentDTO,
	UpdatePatchInstallmentDTO,
	UpdatePutInstallmentDTO,
} from './dto';

@Injectable()
export class InstallmentService {
	constructor(private readonly prismaService: PrismaService) {}

	async create({
		paid,
		value,
		expenseId,
		closesDay,
		number,
	}: CreateInstallmentDTO): Promise<Installment> {
		await this.expenseExists(expenseId);

		const data: any = {
			paid,
			value,
			expenseId,
			closesDay,
			number,
		};

		return this.prismaService.installment.create({ data });
	}

	async createMany(body: CreateInstallmentDTO[], expenseId: number) {
		await this.expenseExists(expenseId);

		const data: any[] = body.map(
			({ expenseId, value, paid, closesDay, number }) => {
				return {
					paid,
					value: new Prisma.Decimal(value),
					expenseId,
					closesDay,
					number,
				};
			},
		);

		const installments = this.prismaService.installment.createMany({ data });
		return installments;
	}

	async list() {
		return this.prismaService.installment.findMany();
	}

	async show(id: number) {
		await this.exists(id);
		return this.prismaService.installment.findUnique({ where: { id } });
	}

	async update(id: number, data: UpdatePutInstallmentDTO) {
		await this.exists(id);

		return this.prismaService.installment.update({
			where: { id },
			data,
		});
	}

	async updatePartial(
		id: number,
		{ paid, value, expenseId, closesDay, number }: UpdatePatchInstallmentDTO,
	) {
		await this.exists(id);
		const data: any = {};

		if (paid) data.paid = paid;
		if (value) data.value = value;
		if (expenseId) data.expenseId = expenseId;
		if (closesDay) data.closesDay = closesDay;
		if (number) data.number = number;

		return this.prismaService.installment.update({
			where: { id },
			data,
		});
	}

	async delete(id: number) {
		return this.prismaService.installment.delete({ where: { id } });
	}

	async exists(id: number): Promise<void> {
		const isInstallmentExists = await this.prismaService.installment.count({
			where: { id },
		});

		if (!isInstallmentExists) {
			throw new NotFoundException(`A Parcela ${id} não existe.`);
		}
	}

	async expenseExists(id: number): Promise<void> {
		const isExpenseExists = await this.prismaService.expense.count({
			where: { id: Number(id) },
		});

		if (!isExpenseExists) {
			throw new NotFoundException(`A Despesa ${id} não existe.`);
		}
	}
}