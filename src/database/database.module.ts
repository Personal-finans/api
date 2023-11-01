import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				type: 'mysql',
				host: configService.getOrThrow('TYPEORM_HOST'),
				port: configService.getOrThrow('TYPEORM_PORT'),
				database: configService.getOrThrow('TYPEORM_DATABASE'),
				username: configService.getOrThrow('TYPEORM_USERNAME'),
				password: configService.getOrThrow('TYPEORM_PASSWORD'),
				autoLoadEntities: configService.getOrThrow('TYPEORM_AUTOLOADENTITIES'),
				synchronize: configService.getOrThrow('TYPEORM_SYNCHRONIZE'),
			}),
			inject: [ConfigService],
		}),
	],
})
export class DatabaseModule {}
