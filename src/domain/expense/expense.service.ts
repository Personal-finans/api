import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Expense, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';
import {
	CreateExpenseDTO,
	UpdatePatchExpenseDTO,
	UpdatePutExpenseDTO,
} from './dto';

@Injectable()
export class ExpenseService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
	) {}

	async create(
		{
			name,
			totalValue,
			description,
			numberOfInstallments,
			dueDate,
		}: CreateExpenseDTO,
		user: User,
	) {
		const {
			profile: { id },
		} = await this.userService.showProfile(user.id);

		const data: any = {
			name,
			description,
			totalValue,
			dueDate,
			numberOfInstallments,
			profileId: id,
			creatorId: id,
		};

		const expense = await this.prismaService.expense.create({ data });

		if (!expense) {
			throw new BadRequestException('Não foi possivel criar a despesa.');
		}

		const installmentValue = totalValue / numberOfInstallments;
		const expenseId = expense.id;
		const installments = [];

		for (let number = 1; number <= numberOfInstallments; number++) {
			const dueDate = new Date();
			dueDate.setMonth(dueDate.getMonth() + number);

			const installment = {
				value: installmentValue.toFixed(2), // valor da parcela
				paid: false, // se a parcela foi paga
				number, //numero da parcela
				dueDate, // data de vencimento da parcela
				expenseId, // despesa ID
			};

			installments.push(installment);
		}

		await this.prismaService.installment.createMany({
			data: installments,
		});

		return this.show(expense.id);
	}

	async list(): Promise<Expense[]> {
		return this.prismaService.expense.findMany({
			include: { installment: true },
		});
	}

	async show(id: number): Promise<Expense> {
		await this.exists(id);

		return this.prismaService.expense.findUnique({
			where: { id },
			include: { installment: true },
		});
	}

	async update(id: number, data: UpdatePutExpenseDTO): Promise<Expense> {
		await this.exists(id);

		return this.prismaService.expense.update({
			where: { id },
			data,
		});
	}

	async updatePartial(
		id: number,
		{ description, name, totalValue }: UpdatePatchExpenseDTO,
	): Promise<Expense> {
		await this.exists(id);

		const data: any = {};

		if (name) data.name = name;
		if (description) data.description = description;
		if (totalValue) data.totalValue = totalValue;

		return this.prismaService.expense.update({
			where: { id },
			data,
		});
	}

	async delete(id: number): Promise<Expense> {
		await this.exists(id);
		return this.prismaService.expense.delete({ where: { id } });
	}

	async exists(id: number): Promise<void> {
		const isUserExists = await this.prismaService.expense.count({
			where: { id },
		});

		if (!isUserExists) {
			throw new NotFoundException(`A Despesa ${id} não existe.`);
		}
	}
}
