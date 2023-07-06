import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

@Module({
	imports: [PrismaModule, UserModule, AuthModule],
	controllers: [ExpenseController],
	providers: [ExpenseService],
	exports: [ExpenseService],
})
export class ExpenseModule {}
