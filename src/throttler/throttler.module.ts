import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerModule as NestThrottlerModule } from '@nestjs/throttler';

@Module({
	imports: [
		NestThrottlerModule.forRootAsync({
			useFactory: () => ({
				throttlers: [
					{
						ttl: 60,
						limit: 120,
					},
				],
			}),
			inject: [ConfigService],
		}),
	],
})
export class ThrottlerModule {}
