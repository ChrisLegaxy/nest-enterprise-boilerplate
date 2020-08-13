import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import Log from '../bootstraps/Log';

export class Locals {
  private static configService: ConfigService;

  public static async init(_express: NestExpressApplication): Promise<NestExpressApplication> {
    await Log.info('Configurations :: Loading');

    this.configService = await _express.get(ConfigService);

    await Log.info('Configurations :: Loaded Successfully');

    return await _express;
  }

  public static config(): any {
    const app = this.configService.get('app');
    const auth = this.configService.get('auth');
    const database = this.configService.get('database');

    return {
      app,
      auth,
      database
    };
  }
}
