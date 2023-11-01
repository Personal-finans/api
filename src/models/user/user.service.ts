import { Injectable } from '@nestjs/common';
import { BaseService } from '../../shared/base/base-service';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService extends BaseService<User> {
	constructor(repository: UserRepository) {
		super(repository);
	}
}
