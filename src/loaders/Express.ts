import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '../app.module';
import { Bootstrapper } from '../bootstraps/Bootstrapper';

import Log from '../bootstraps/Log';
import { Locals } from './Locals';

export class Express {
  private static express: NestExpressApplication;

  private static async createExpressApplication(): Promise<void> {
    this.express = await NestFactory.create<NestExpressApplication>(AppModule);
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
        Locals.config().app.secured === "true" ? 'https' : 'http'
      }://${Locals.config().app.host}:${Locals.config().app.port}`
    );
  }

  public static async init(): Promise<void> {
    await this.createExpressApplication();
    await this.mountConfigurations();
    await this.mountBootstrapper();
    await this.startExpressApplication();
  }
}
