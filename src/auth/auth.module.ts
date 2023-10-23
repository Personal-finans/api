import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from 'src/models/profile/profile.module';
import { UserModule } from 'src/models/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from '../models/user/user.service';
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
