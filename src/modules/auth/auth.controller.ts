import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Body
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('login')
  public async login() {
    return await this.authService.validate();
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() body: UserRegisterDto,
    @Res() response: Response
  ): Promise<any> {
    return response.json(await this.userService.create(body));
  }
}
