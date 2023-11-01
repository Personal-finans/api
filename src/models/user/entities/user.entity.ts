import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../shared/base/base-entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
	@Column({
		unique: true,
	})
	email: string;

	@Column()
	password: string;

	@Column({
		type: 'boolean',
		default: true,
	})
	status: boolean;
}
