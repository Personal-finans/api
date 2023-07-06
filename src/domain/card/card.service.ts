import { Injectable, NotFoundException } from '@nestjs/common';
import { Card, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateCardDTO, UpdatePatchCardDTO, UpdatePutCardDTO } from './dto';

@Injectable()
export class CardService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
	) {}

	async create(
		{ bankName, invoiceDueDate }: CreateCardDTO,
		user: User,
	): Promise<Card> {
		const {
			profile: { id },
		} = await this.userService.showProfile(user.id);

		const data: any = {
			bankName,
			invoiceDueDate: Number(invoiceDueDate),
			profileId: id,
		};

		return this.prismaService.card.create({
			data,
		});
	}

	async list(userId: number): Promise<Card[]> {
		const {
			profile: { id: profileId },
		} = await this.prismaService.user.findFirst({
			where: { id: userId },
			include: { profile: true },
		});

		return this.prismaService.card.findMany({
			where: { profileId },
		});
	}

	async show(id: number): Promise<Card> {
		await this.exists(id);
		return this.prismaService.card.findUnique({ where: { id } });
	}

	async update(id: number, data: UpdatePutCardDTO) {
		await this.exists(id);

		return await this.prismaService.card.update({
			where: { id },
			data,
		});
	}

	async updatePartial(
		id: number,
		{ bankName, invoiceDueDate }: UpdatePatchCardDTO,
	): Promise<Card> {
		await this.exists(id);

		const data: any = {};
		if (bankName) data.bankName = bankName;
		if (invoiceDueDate) data.invoiceDueDate = invoiceDueDate;

		return this.prismaService.card.update({
			where: { id },
			data,
		});
	}

	async delete(id: number): Promise<Card> {
		await this.exists(id);
		return this.prismaService.card.delete({ where: { id } });
	}

	async exists(id: number): Promise<void> {
		const isUserExists = await this.prismaService.card.count({
			where: { id },
		});

		if (!isUserExists) {
			throw new NotFoundException(`O Cartão ${id} não existe.`);
		}
	}
}
