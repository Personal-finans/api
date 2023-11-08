import { Entity } from 'typeorm';
import { BaseEntity } from '../../../shared/base/base-entity';

@Entity({ name: 'profiles' })
export class Profile extends BaseEntity {}
