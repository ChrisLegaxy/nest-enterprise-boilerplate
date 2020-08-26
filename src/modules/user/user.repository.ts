import { Repository, EntityRepository } from 'typeorm';

import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User> {
    return await this.findOne({ email });
  }
}
