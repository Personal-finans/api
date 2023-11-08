import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { BaseEntity } from './base-entity';
import { BaseService } from './base-service';

export abstract class BaseController<T extends BaseEntity> {
	constructor(private readonly baseService: BaseService<T>) {}

	@Get()
	async findAll() {
		return this.baseService.findAll();
	}

	@Get(':id')
	async findById(@Param('id') id: string): Promise<T> {
		return this.baseService.findById(id);
	}

	@Post()
	async create(@Body() data: any): Promise<T> {
		return this.baseService.create(data);
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() data: any): Promise<T> {
		return this.baseService.update(id, data);
	}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<DeleteResult> {
		return this.baseService.delete(id);
	}
}
