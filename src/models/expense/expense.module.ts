import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [ExpenseController],
	providers: [ExpenseService],
	exports: [ExpenseService],
})
export class ExpenseModule {}
