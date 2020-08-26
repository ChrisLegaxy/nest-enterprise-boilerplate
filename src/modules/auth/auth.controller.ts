import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Body,
  UseGuards,
  Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { RegisterBodyDto } from './dto/AuthDto';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() request: Request) {
    return this.authService.generateJwt(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  public async getProfile(@Req() request: Request) {
    return request.user;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() body: RegisterBodyDto,
    @Res() response: Response
  ): Promise<any> {
    return response.json(await this.userService.register(body));
  }
}
