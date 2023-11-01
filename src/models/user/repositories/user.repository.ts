import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../shared/base/base-repository';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user.interface';

@Injectable()
export class UserRepository
	extends BaseRepository<User>
	implements IUserRepository
{
	constructor(repository: Repository<User>) {
		super(repository);
	}

	findByEmail(email: string): Promise<User> {
		return this.findByEmail(email);
	}
}
