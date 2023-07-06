import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdatePatchProfileDTO } from './dto/update-patch-profile.dto';
import { UpdatePutProfileDTO } from './dto/update-put-profile.dto';

@Injectable()
export class ProfileService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(body: CreateProfileDTO, user: User): Promise<Profile> {
		const isPerfilExist = await this.prismaService.profile.count({
			where: {
				userId: user.id,
			},
		});

		if (isPerfilExist) {
			throw new BadRequestException('O Usuario ja tem um perfil associado.');
		}

		if (!body) {
			body = {
				name: null,
				photoUrl: null,
				bio: null,
			};
		}

		const data: any = {
			name: body.name ?? user.email.split('@')[0],
			photoUrl: body.photoUrl,
			bio: body.bio,
			userId: user.id,
		};

		return this.prismaService.profile.create({
			data,
		});
	}

	async list(): Promise<Profile[]> {
		return this.prismaService.profile.findMany();
	}

	async show(userId: number): Promise<Profile> {
		const usuario = await this.existsUserProfile(userId);
		await this.exists(usuario.profile.id);

		return this.prismaService.profile.findUnique({
			where: { id: usuario.profile.id },
		});
	}

	async update(userId: number, data: UpdatePutProfileDTO): Promise<Profile> {
		const usuario = await this.existsUserProfile(userId);
		await this.exists(usuario.profile.id);

		data.userId = userId;

		return this.prismaService.profile.update({
			where: { id: usuario.profile.id },
			data,
		});
	}

	async updatePartial(
		userId: number,
		{ bio, name, photoUrl }: UpdatePatchProfileDTO,
	): Promise<Profile> {
		const usuario = await this.existsUserProfile(userId);
		await this.exists(usuario.profile.id);

		const data: any = {};

		if (bio) data.bio = bio;

		if (name) data.name = name;

		if (photoUrl) data.photoUrl = photoUrl;

		if (userId) data.userId = userId;

		return this.prismaService.profile.update({
			where: { id: usuario.profile.id },
			data,
		});
	}

	async delete(userId: number): Promise<Profile> {
		const usuario = await this.existsUserProfile(userId);
		await this.exists(usuario.profile.id);
		return this.prismaService.profile.delete({
			where: { id: usuario.profile.id },
		});
	}

	async exists(id: number): Promise<void> {
		const isUserExists = await this.prismaService.profile.count({
			where: { id },
		});

		if (!isUserExists) {
			this.throwErrorProfileDoesNotExist(id);
		}
	}

	async existsUserProfile(userId: number) {
		const usuario = await this.prismaService.user.findUnique({
			where: { id: userId },
			include: {
				profile: true,
			},
		});

		if (!usuario.profile) {
			throw new NotFoundException('Usuário não possui perfil.');
		}

		return usuario;
	}

	throwErrorProfileDoesNotExist(id: number) {
		throw new NotFoundException(`O perfil ${id} não existe.`);
	}
}
