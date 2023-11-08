import { DeepPartial, DeleteResult } from 'typeorm';
import { BaseEntity } from './base-entity';

export interface IRepository<T extends BaseEntity> {
	findAll(): Promise<T[]>;
	findById(id: string): Promise<T>;
	create(data: DeepPartial<T>): Promise<T>;
	update(id: string, data: Partial<T>): Promise<T>;
	delete(id: string): DeleteResult;
}
