import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { MailerModule } from './shared/mailer/mailer.module';
import { ModelsModule } from './models/models.module';
import { ThrottlerModule } from './throttler/throttler.module';

@Module({
	imports: [
		MailerModule,
		AuthModule,
		ModelsModule,
		ConfigModule,
		DatabaseModule,
		ThrottlerModule,
	],
	controllers: [],
	providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
