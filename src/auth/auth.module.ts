import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/models/user/user.module';
import { ConfigModule } from '../config/config.module';
import { User } from '../models/user/entities/user.entity';
import { UserRepository } from '../models/user/repositories/user.repository';
import { UserService } from '../models/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					secret: configService.get<string>('JWT_SIGNATURE'),
				};
			},
		}),
		forwardRef(() => UserModule),
		TypeOrmModule.forFeature([User]),
		// forwardRef(() => ProfileModule),
	],
	controllers: [AuthController],
	providers: [AuthService, UserService, UserRepository],
	exports: [AuthService],
})
export class AuthModule {}
