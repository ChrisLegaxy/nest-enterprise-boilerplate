import {
  Controller,
  Get,
  Res,
  Post,
  HttpStatus,
  Param,
  NotFoundException
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async get(@Res() response: Response): Promise<any> {
    return await response.json(await this.userService.find());
  }

  @Get(':id')
  public async getById(@Param('id') id: number, @Res() response: Response): Promise<any> {
    try {
      return await response.json(await this.userService.findOneOrFail(id));
    } catch (error) {
      throw new NotFoundException({
        ...error,
        status: HttpStatus.NOT_FOUND
      });
    }
  }

  @Post()
  public async create(@Res() response: Response): Promise<any> {
    const user = new User();

    user.firstName = 'Wow';
    user.lastName = 'OMG';
    user.isActive = true;

    await this.userService.create(user);

    return await response.status(HttpStatus.CREATED).json(user);
  }
}
