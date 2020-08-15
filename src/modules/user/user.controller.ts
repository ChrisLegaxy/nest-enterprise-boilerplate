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
  Body
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UpdateUserBody } from './dto/UserDto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  public async get(@Res() response: Response): Promise<any> {
    return response.json(await this.userService.find());
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
    @Body() body: UpdateUserBody,
    @Res() response: Response
  ): Promise<any> {
    return response.json(await this.userService.update(id, body));
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.delete(id);
  }
}
