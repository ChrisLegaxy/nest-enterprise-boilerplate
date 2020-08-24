import {
  Controller,
  Get,
  Res,
  Param,
  ParseIntPipe,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  Body,
  Query,
  ValidationPipe
} from '@nestjs/common';
import { Response, response } from 'express';
import { UserService } from './user.service';
import { UpdateUserBodyDto } from './dto/UserDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UsersPageDto } from './dto/UsersPageDto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  public async get(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
    @Res() response: Response
  ): Promise<any> {
    const users: UsersPageDto = await this.userService.findAllUsers(
      pageOptionsDto
    );

    return response.json(users);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ): Promise<any> {
    return response.json(await this.userService.findOneOrFail(id));
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserBodyDto,
    @Res() response: Response
  ): Promise<any> {
    return response.json(await this.userService.update(id, body));
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.userService.delete(id);
  }
}
