import { IRepository } from '../../../shared/base/irepository';
import { User } from '../entities/user.entity';

export interface IUserRepository extends IRepository<User> {
	findByEmail(email: string): Promise<User | undefined>;
}
