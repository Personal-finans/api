import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './domain/card/card.module';
import { ExpenseModule } from './domain/expense/expense.module';
import { InstallmentModule } from './domain/installment/installment.module';
import { ProfileModule } from './domain/profile/profile.module';
import { UserModule } from './domain/user/user.module';

@Module({
	imports: [
		CardModule,
		ExpenseModule,
		InstallmentModule,
		forwardRef(() => ProfileModule),
		forwardRef(() => UserModule),
		forwardRef(() => AuthModule),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
