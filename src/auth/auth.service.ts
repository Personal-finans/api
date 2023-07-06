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
import { ProfileService } from '../domain/profile/profile.service';

export interface JWTPayload {
	id: number;
	iat: number;
	exp: number;
	iss: string;
}

@Injectable()
export class AuthService {
	private readonly issuer = 'login';
	private readonly expiresIn = process.env.JWT_EXPIRES_IN;

	constructor(
		private readonly jwtService: JwtService,
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
		private readonly profileService: ProfileService,
	) {}

	async createToken(user: User) {
		const { password, ...userWithoutPassword } = user;

		return {
			accessToken: await this.jwtService.signAsync(
				{
					id: user.id,
				},
				{
					expiresIn: this.expiresIn,
					issuer: this.issuer,
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

	// TODO: Implementar forget
	async forget(email: string) {
		return email;
	}

	// TODO: Implementar reset
	async reset(password: string, token: string) {
		return password;
	}

	async register(data: any) {
		const user = await this.userService.create(data);
		await this.profileService.create(null, user);
		const userWithProfile = await this.userService.show(user.id);

		return this.createToken(userWithProfile);
	}
}
