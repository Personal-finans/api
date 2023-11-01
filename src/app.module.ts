import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from './config/config.modules';
import { DatabaseModule } from './database/database.module';
import { MailerModule } from './mailer/mailer.module';
import { ModelsModule } from './models/models.module';
import { ThrottlerModule } from './throttler/throttler.module';

@Module({
	imports: [
		MailerModule,
		// AuthModule,
		ModelsModule,
		ConfigModule,
		DatabaseModule,
		ThrottlerModule,
	],
	controllers: [],
	providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
