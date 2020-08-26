import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Locals } from 'src/loaders/Locals';
import { JwtConfigService } from 'src/services/jwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService
    })
  ],
  controllers: [AuthController],
  providers: [ConfigService, AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
