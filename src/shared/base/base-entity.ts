import {
	CreateDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity as TypeOrmBaseEntity,
	UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
	@PrimaryGeneratedColumn({ unsigned: true })
	id?: string;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;
}
