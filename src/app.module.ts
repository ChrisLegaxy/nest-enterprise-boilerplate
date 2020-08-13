import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';

import { DatabaseService } from './services/database.service';
import { envValidator } from './helpers/envValidator';

envValidator(process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.development.local`,
        `.env.${process.env.NODE_ENV || 'development'}`,
      ],
      load: [appConfig, authConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseService,
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
