import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Expense } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import {
	CreateExpenseDTO,
	UpdatePatchExpenseDTO,
	UpdatePutExpenseDTO,
} from './dto';

export interface ExpenseStatistics {
	totalValue: number; // Valor total das despesas deste mês
	percentChangeLastMonth: number; // Porcentagem de mudança das despesas em relação ao mês passado
}

@Injectable()
export class ExpenseService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(
		{
			name,
			value,
			description,
			numberOfInstallments,
			closesDay,
			paymentMethodId,
		}: CreateExpenseDTO,
		profileId: number,
	) {
		const data: any = {
			name,
			description,
			value,
			closesDay,
			numberOfInstallments,
			paymentMethodId,
			profileId: profileId,
		};

		const expense = await this.prismaService.expense.create({ data });

		if (!expense) {
			throw new BadRequestException('Não foi possivel criar a despesa.');
		}

		const installmentValue = value / numberOfInstallments;
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

	async list(profileId: number): Promise<Expense[]> {
		return this.prismaService.expense.findMany({
			where: {
				profileId,
			},
			include: { installment: true },
		});
	}

	// async statistics(profileId: number) {
	// 	const currentDate = new Date();
	// 	const currentMonth = currentDate.getMonth() + 1; // Obtemos o mês atual
	// 	const nextMonth = currentMonth + 1; // Obtemos o próximo mês

	// 	const expenseStatistics: ExpenseStatistics = {
	// 		totalValue: 0,
	// 		percentChangeLastMonth: 0,
	// 	};

	// 	const [nextMonthExpenses, currentMonthExpenses] = await Promise.all([
	// 		this.prismaService.expense.findMany({
	// 			where: {
	// 				profileId,
	// 				installment: {
	// 					some: {
	// 						closesDay: 1,
	// 						paid: false,
	// 					},
	// 				},
	// 			},
	// 			include: {
	// 				installment: {
	// 					where: {
	// 						closesDay: 1,
	// 						paid: false,
	// 					},
	// 					select: {
	// 						value: true,
	// 					},
	// 				},
	// 			},
	// 		}),
	// 		this.prismaService.expense.findMany({
	// 			where: {
	// 				profileId,
	// 				installment: {
	// 					some: {
	// 						dueDate: {
	// 							gte: new Date(currentDate.getFullYear(), currentMonth - 1),
	// 							lt: new Date(currentDate.getFullYear(), currentMonth),
	// 						},
	// 						paid: false,
	// 					},
	// 				},
	// 			},
	// 			include: {
	// 				installment: {
	// 					where: {
	// 						dueDate: {
	// 							gte: new Date(currentDate.getFullYear(), currentMonth - 1),
	// 							lt: new Date(currentDate.getFullYear(), currentMonth),
	// 						},
	// 						paid: false,
	// 					},
	// 					select: {
	// 						value: true,
	// 					},
	// 				},
	// 			},
	// 		}),
	// 	]);

	// 	const nextMonthTotalValue = nextMonthExpenses.reduce((total, expense) => {
	// 		expense.installment?.forEach((installment) => {
	// 			total += +installment.value;
	// 		});
	// 		return total;
	// 	}, 0);

	// 	const currentMonthTotalValue = currentMonthExpenses.reduce(
	// 		(total, expense) => {
	// 			expense.installment?.forEach((installment) => {
	// 				total += +installment.value;
	// 			});
	// 			return total;
	// 		},
	// 		0,
	// 	);

	// 	expenseStatistics.totalValue = nextMonthTotalValue;

	// 	if (currentMonthTotalValue > 0) {
	// 		expenseStatistics.percentChangeLastMonth =
	// 			((nextMonthTotalValue - currentMonthTotalValue) /
	// 				currentMonthTotalValue) *
	// 			100;
	// 	}

	// 	return expenseStatistics;
	// }

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
		{
			description,
			name,
			value,
			closesDay,
			numberOfInstallments,
			paymentMethodId,
		}: UpdatePatchExpenseDTO,
	): Promise<Expense> {
		await this.exists(id);

		const data: any = {};

		if (name) data.name = name;
		if (description) data.description = description;
		if (value) data.value = value;
		if (closesDay) data.closesDay = closesDay;
		if (numberOfInstallments) data.numberOfInstallments = numberOfInstallments;
		if (paymentMethodId) data.paymentMethodId = paymentMethodId;

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
