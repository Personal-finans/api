import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { InstallmentsController } from './Installment.controller';
import { InstallmentService } from './Installment.service';

@Module({
	imports: [
		PrismaModule,
		forwardRef(() => UserModule),
		forwardRef(() => AuthModule),
	],
	controllers: [InstallmentsController],
	providers: [InstallmentService],
	exports: [InstallmentService],
})
export class InstallmentModule {}
