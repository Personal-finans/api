import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DeepPartial, DeleteResult } from 'typeorm';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.interface';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService implements IUserRepository {
	constructor(private readonly repository: UserRepository) {}

	async findAll(): Promise<User[]> {
		return this.repository.findAll();
	}

	async findByEmail(email: string): Promise<User> {
		return this.repository.findByEmail(email);
	}

	async findById(id: string): Promise<User> {
		return this.repository.findById(id);
	}

	async create(data: DeepPartial<User>): Promise<User> {
		const salt = await bcrypt.genSalt();

		data.password = await bcrypt.hash(data.password, salt);
		return this.repository.save(data);
	}

	async update(id: string, data: DeepPartial<User>): Promise<User> {
		return this.repository.save({ id, ...data });
	}

	async delete(id: string): Promise<DeleteResult> {
		return this.repository.delete(id);
	}
}
