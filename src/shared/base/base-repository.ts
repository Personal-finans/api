import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntity, Entity, FindOptionsWhere, Repository } from 'typeorm';

export abstract class BaseRepository<
	T extends BaseEntity,
> extends Repository<T> {
	private readonly entity: typeof Entity;
	constructor(
		@InjectRepository(Entity)
		private repository: Repository<T>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findAll(): Promise<T[]> {
		return this.repository.find();
	}

	async findById(id: string): Promise<T> {
		return this.repository.findOne({
			where: { id } as unknown as FindOptionsWhere<T>,
		});
	}
}
