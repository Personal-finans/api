import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/shared/utils/hashPassword';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(data: CreateUserDTO): Promise<User> {
		const emailExists = await this.prismaService.user.findFirst({
			where: {
				email: data.email,
			},
		});

		if (emailExists) {
			throw new NotFoundException('Este email ja esta sendo utilizado.');
		}

		data.password = await hashPassword(data.password);

		const user = await this.prismaService.user.create({ data });

		return this.show(user.id);
	}

	async list(): Promise<User[]> {
		return this.prismaService.user.findMany();
	}

	async show(id: number): Promise<User> {
		await this.exists(id);

		return this.prismaService.user.findUnique({
			where: { id },
			include: {
				profile: true,
			},
		});
	}

	async showProfile(id: number) {
		await this.exists(id);

		const userWithProfile = await this.prismaService.user.findUnique({
			where: { id },
			include: {
				profile: true,
			},
		});

		if (!userWithProfile.profile) {
			throw new NotFoundException('Usuário não possui perfil.');
		}

		return userWithProfile;
	}

	async update(id: number, data: UpdatePutUserDTO): Promise<User> {
		await this.exists(id);

		data.password = await hashPassword(data.password);

		return await this.prismaService.user.update({
			where: { id },
			data,
		});
	}

	async updatePartial(
		id: number,
		{ email, password }: UpdatePatchUserDTO,
	): Promise<User> {
		await this.exists(id);

		const data: any = {};

		if (email) data.email = email;

		if (password) data.password = await hashPassword(password);

		return this.prismaService.user.update({
			where: { id },
			data,
		});
	}

	async delete(id: number): Promise<User> {
		return this.prismaService.user.delete({ where: { id } });
	}

	async exists(id: number): Promise<void> {
		const isUserExists = await this.prismaService.user.count({
			where: { id },
		});

		if (!isUserExists) {
			throw new NotFoundException(`O usuário ${id} não existe.`);
		}
	}
}
