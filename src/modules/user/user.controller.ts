import {
  Controller,
  Get,
  Res,
  Post,
  HttpStatus,
  Param,
  NotFoundException,
  Body,
  ParseIntPipe,
  HttpCode,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/UserDto';
import { Http } from 'src/bootstraps/Http';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async get(@Res() response: Response): Promise<any> {
    return await response.json(await this.userService.find());
  }

  @Get(':id')
  public async getById(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ): Promise<any> {
    return await response.json(await this.userService.findOneOrFail(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // @UsePipes(new ValidationPipe({ }))
  public async create(
    @Body() body: UserDto,
    @Res() response: Response
  ): Promise<any> {
    const user = new User();

    user.email = body.email;
    user.password = body.password;

    await this.userService.create(user);

    return await response.status(HttpStatus.CREATED).json(user);
  }
}
