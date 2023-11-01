import { BaseEntity } from './base-entity';
import { IRepository } from './irepository';

export abstract class BaseService<T extends BaseEntity> {
	constructor(private readonly repository: IRepository<T>) {}

	async findAll(): Promise<T[]> {
		return this.repository.findAll();
	}

	async findById(id: string): Promise<T> {
		return this.repository.findById(id);
	}

	async create(data: Partial<T>): Promise<T> {
		return this.repository.create(data);
	}

	async update(id: string, data: Partial<T>): Promise<T> {
		return this.repository.update(id, data);
	}

	async delete(id: string): Promise<void> {
		return this.repository.delete(id);
	}
}
