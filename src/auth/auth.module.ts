import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from 'src/domain/profile/profile.module';
import { UserModule } from 'src/domain/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from '../domain/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SIGNATURE,
		}),
		forwardRef(() => UserModule),
		forwardRef(() => ProfileModule),
		PrismaModule,
	],
	controllers: [AuthController],
	providers: [AuthService, UserService],
	exports: [AuthService, UserService],
})
export class AuthModule {}
