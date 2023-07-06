import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CardModule } from './card/card.module';
import { ExpenseModule } from './expense/expense.module';
import { InstallmentModule } from './installment/installment.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';

const Domains = [
	CardModule,
	ExpenseModule,
	InstallmentModule,
	ProfileModule,
	UserModule,
	AuthModule,
	// forwardRef(() => UserModule),
	// forwardRef(() => AuthModule),
];

@Module({
	imports: [...Domains],
	exports: [...Domains],
})
export class DomainModule {}
