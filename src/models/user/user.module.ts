import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
	forwardRef,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIdCheckMiddleware } from 'src/middleware/user-id-check-middleware';
import { AuthModule } from '../../auth/auth.module';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService, UserRepository],
	exports: [UserService, UserRepository],
})
export class UserModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(UserIdCheckMiddleware).forRoutes({
			path: 'users/:id',
			method: RequestMethod.ALL,
		});
	}
}
