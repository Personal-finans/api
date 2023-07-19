import { MailerService } from '@nestjs-modules/mailer';
import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/domain/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDTO } from '../domain/profile/dto/create-profile.dto';
import { ProfileService } from '../domain/profile/profile.service';
import { AuthRegisterDTO } from './dto';

export interface JWTPayload {
	id: number;
	iat: number;
	exp: number;
	iss: string;
}

export enum Issuer {
	LOGIN = 'login',
	FORGET = 'forget',
}

export enum ExpiresIn {
	LOGIN = '1d',
	FORGET = '60 minutes',
}

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
		private readonly profileService: ProfileService,
		private readonly mailerService: MailerService,
	) {}

	async createToken(user: User) {
		const { password, ...userWithoutPassword } = user;

		return {
			accessToken: await this.jwtService.signAsync(
				{
					id: user.id,
				},
				{
					expiresIn: ExpiresIn.LOGIN,
					issuer: Issuer.LOGIN,
				},
			),
			user: userWithoutPassword,
		};
	}

	async checkToken(token: string) {
		try {
			const data = await this.jwtService.verifyAsync(token, {
				issuer: 'login',
			});

			return data;
		} catch (error) {
			throw new BadRequestException(error);
		}
	}

	async isValidToken(token: string) {
		try {
			await this.checkToken(token);
			return true;
		} catch (error) {
			return false;
		}
	}

	async login(email: string, password: string) {
		const user = await this.prismaService.user.findFirst({
			where: { email },
			include: {
				profile: true,
			},
		});

		if (!user) {
			throw new UnauthorizedException('Email e/ou senha incorretos.');
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			throw new UnauthorizedException('Email e/ou senha incorretos.');
		}

		return this.createToken(user);
	}

	async forget(email: string) {
		const user = await this.prismaService.user.findFirst({
			where: { email },
		});

		if (!user) {
			return false;
		}

		const token = this.jwtService.sign(
			{
				id: user.id,
			},
			{
				expiresIn: ExpiresIn.FORGET,
				issuer: Issuer.FORGET,
			},
		);

		await this.mailerService.sendMail({
			subject: 'Recuperação de Senha',
			to: user.email,
			template: 'forget',
			context: {
				email: user.email,
				token: token,
			},
		});

		return true;
	}

	async reset(password: string, token: string) {
		try {
			const data = await this.jwtService.verifyAsync(token, {
				issuer: 'forget',
			});

			if (isNaN(Number(data.id))) {
				throw new BadRequestException('Token invalido');
			}

			const salt = await bcrypt.genSalt();
			password = await bcrypt.hash(password, salt);

			const user = await this.prismaService.user.update({
				where: {
					id: data.id,
				},
				data: {
					password,
				},
			});

			return this.createToken(user);
		} catch (error) {
			throw new BadRequestException(error);
		}
	}

	async register({ name, email, password }: AuthRegisterDTO) {
		const user = await this.userService.create({ email, password });
		const profile: CreateProfileDTO = {
			bio: null,
			name: name,
			photoUrl: null,
		};
		await this.profileService.create(profile, user);
		const userWithProfile = await this.userService.show(user.id);

		await this.mailerService.sendMail({
			subject: 'Bem-vindo(a) ao Finans - Seu parceiro financeiro pessoal!',
			to: user.email,
			template: 'welcome',
			context: {
				name: userWithProfile.profile.name,
			},
		});

		return this.createToken(userWithProfile);
	}
}
