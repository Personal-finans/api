import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
	constructor(
		@InjectRepository(User)
		private repository: Repository<User>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	findAll(): Promise<User[]> {
		return this.repository.find();
	}

	findById(id: string): Promise<User> {
		return this.repository.findOne({
			where: {
				id,
			},
		});
	}

	findByEmail(email: string): Promise<User> {
		return this.repository.findOneBy({ email });
	}
}
