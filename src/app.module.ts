import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from './mailer/mailer.module';
import { ModelsModule } from './models/models.module';

@Module({
	imports: [
		MailerModule,
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 120,
		}),
		ModelsModule,
	],
	controllers: [],
	providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
