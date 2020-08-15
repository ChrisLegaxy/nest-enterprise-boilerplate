import {
  Injectable,
  NotFoundException,
  NotAcceptableException
} from '@nestjs/common';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UpdateUserBody } from './dto/UserDto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async find(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findByIds(ids: number[]): Promise<User[]> {
    return await this.userRepository.findByIds(ids);
  }

  public async findOneOrFail(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  public async create(userRegisterDto: UserRegisterDto): Promise<User> {
    try {
      const user = this.userRepository.create(userRegisterDto);

      return await this.userRepository.save(user);
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }

  public async update(
    id: number,
    updateUserBody: UpdateUserBody
  ): Promise<User> {
    const user = await this.findOneOrFail(id);

    return await this.userRepository.save({
      ...user,
      ...updateUserBody
    });
  }

  public async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
