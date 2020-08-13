import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository
  ) {}

  public async find(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findByIds(ids: Array<number>): Promise<Array<User>> {
    return await this.userRepository.findByIds(ids);
  }

  public async findOne(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  public async findOneOrFail(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }

  public async create(user: User): Promise<User> {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  public async update(id: number, user: User): Promise<User> {
    user.id = id;
    return await this.userRepository.save(user);
  }

  public async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
    return;
  }
}
