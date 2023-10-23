import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailerConfig } from './mailer-config';

@Module({
	imports: [NestMailerModule.forRoot(MailerConfig)],
})
export class MailerModule {}
