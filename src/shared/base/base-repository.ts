import { BaseEntity, DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<T extends BaseEntity> {
	constructor(private readonly repository: Repository<T>) {}

	async findAll(): Promise<T[]> {
		return this.repository.find();
	}

	async findById(id: string): Promise<T> {
		return this.repository.findOne({
			where: { id } as unknown as FindOptionsWhere<T>,
		});
	}

	async create(data: DeepPartial<T>): Promise<T> {
		const entity = this.repository.create(data);
		return this.repository.save(entity);
	}

	async update(id: string, data: QueryDeepPartialEntity<T>): Promise<T> {
		await this.repository.update(id, data);
		return this.findById(id);
	}

	async delete(id: string): Promise<void> {
		await this.repository.delete(id);
	}
}
