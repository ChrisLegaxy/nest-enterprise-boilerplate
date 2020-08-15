/**
 * @file Express
 *
 * @description
 *    Contains everything related to the NestExpressApplication
 *
 * @author       Chris Van <chrisvan.vshmr@gmail.com> | <chris.legaxy@gmail.com>
 * @copyright    CPC
 * @since        1.0.0
 * @version      1.0.0
 */

import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '../app.module';
import { Bootstrapper } from '../bootstraps/Bootstrapper';

import Log from '../bootstraps/Log';
import { Locals } from './Locals';

export class Express {
  private static express: NestExpressApplication;

  private static async createExpressApplication(): Promise<void> {
    this.express = await NestFactory.create<NestExpressApplication>(AppModule);
  }

  private static async mountGlobal(): Promise<void> {
    await this.express.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true
      })
    );
  }

  private static async mountConfigurations(): Promise<void> {
    this.express = await Locals.init(this.express);
  }

  private static async mountBootstrapper(): Promise<void> {
    this.express = await Bootstrapper.init(this.express);
  }

  private static async startExpressApplication(): Promise<void> {
    await Log.info('Server :: Booting');

    await this.express.listen(Locals.config().app.port);

    await Log.info(
      `Server :: Running @ ${
        Locals.config().app.secured === 'true' ? 'https' : 'http'
      }://${Locals.config().app.host}:${Locals.config().app.port}`
    );

    await Logger.log(
      `Server :: Running @ ${
        Locals.config().app.secured === 'true' ? 'https' : 'http'
      }://${Locals.config().app.host}:${Locals.config().app.port}`,
      'NestExpressApplication'
    );
  }

  public static async init(): Promise<void> {
    await this.createExpressApplication();
    await this.mountGlobal();
    await this.mountConfigurations();
    await this.mountBootstrapper();
    await this.startExpressApplication();
  }
}
