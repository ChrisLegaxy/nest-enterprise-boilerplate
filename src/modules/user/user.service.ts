import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
  ServiceUnavailableException
} from '@nestjs/common';

import { UserRepository } from './user.repository';
import { RegisterBodyDto } from '../auth/dto/AuthDto';
import { UpdateUserBodyDto, UserResponseDto } from './dto/UserDto';
import { UsersPageDto } from './dto/UsersPageDto';
import { PageMetaDto } from 'src/common/dto/PageMetaDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { plainToClass } from 'class-transformer';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async findAllUsers(
    pageOptionsDto: UsersPageOptionsDto
  ): Promise<UsersPageDto> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const [users, usersCount] = await queryBuilder
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .getManyAndCount();

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: usersCount
    });

    return new UsersPageDto(plainToClass(UserResponseDto, users), pageMetaDto);
  }

  public async findByIds(ids: number[]): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findByIds(ids);

    return plainToClass(UserResponseDto, users);
  }

  public async findOneOrFail(id: number): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOneOrFail(id);

      return plainToClass(UserResponseDto, user);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) { throw new NotFoundException('User not found'); }

    return user;
  }

  public async register(
    registerBodyDto: RegisterBodyDto
  ): Promise<UserResponseDto> {
    try {
      const user = this.userRepository.create(registerBodyDto);

      await this.userRepository.save(user);

      return plainToClass(UserResponseDto, user);
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }

  public async update(
    id: number,
    updateUserBody: UpdateUserBodyDto
  ): Promise<UserResponseDto> {
    const user = await this.findOneOrFail(id);

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserBody
    });

    return plainToClass(UserResponseDto, updatedUser);
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.findOneOrFail(id);

      await this.userRepository.delete(id);
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
}
