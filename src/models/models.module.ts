import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CreditCardModule } from './card/creditCard.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';

const Domains = [
	CreditCardModule,
	// ExpenseModule,
	// InstallmentModule,
	forwardRef(() => ProfileModule),
	forwardRef(() => UserModule),
	forwardRef(() => AuthModule),
];

@Module({
	imports: [...Domains],
	exports: [...Domains],
})
export class ModelsModule {}
