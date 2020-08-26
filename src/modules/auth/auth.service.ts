import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginBodyDto } from './dto/AuthDto';
import { User } from '../user/user.entity';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async validateUser(loginBodyDto: LoginBodyDto): Promise<User> {
    try {
      const user = await this.userService.findByEmail(loginBodyDto.email);

      await User.comparePassword(
        loginBodyDto.password,
        plainToClass(User, user)
      );

      return plainToClass(User, user);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async validateUserLocal(email: string, password: string): Promise<User> {
    try {
      const user = await this.userService.findByEmail(email);

      await User.comparePassword(password, plainToClass(User, user));

      return plainToClass(User, user);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async generateJwt(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
