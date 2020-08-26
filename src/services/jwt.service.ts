import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get('app.secret'),
      signOptions: {
        expiresIn: '14d',
        algorithm: 'HS512',
        issuer: this.configService.get('app.name')
      }
    };
  }
}
