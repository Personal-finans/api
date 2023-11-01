import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/models/user/user.module';
import { User } from '../models/user/entities/user.entity';
import { UserService } from '../models/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SIGNATURE,
		}),
		forwardRef(() => UserModule),
		// forwardRef(() => ProfileModule),
		TypeOrmModule.forFeature([User]),
	],
	controllers: [AuthController],
	providers: [AuthService, UserService],
	exports: [AuthService, UserService],
})
export class AuthModule {}
