import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module, forwardRef } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './domain/card/card.module';
import { ExpenseModule } from './domain/expense/expense.module';
import { InstallmentModule } from './domain/installment/installment.module';
import { ProfileModule } from './domain/profile/profile.module';
import { UserModule } from './domain/user/user.module';

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				service: 'gmail',
				host: process.env.SMTP_HOST,
				port: 587,
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD,
				},
			},
			defaults: {
				from: `"Finans." < ${process.env.SMTP_USER} >`,
			},
			template: {
				dir: __dirname + '/templates',
				adapter: new PugAdapter(),
				options: {
					strict: true,
				},
			},
		}),
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 120,
		}),
		CardModule,
		ExpenseModule,
		InstallmentModule,
		forwardRef(() => ProfileModule),
		forwardRef(() => UserModule),
		forwardRef(() => AuthModule),
	],
	controllers: [],
	providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
