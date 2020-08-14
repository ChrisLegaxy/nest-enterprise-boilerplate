/**
 * @file Security Middleware
 *
 * @description
 *    Nest Express's Security Bootstrap Middlewares
 *
 * @author       Chris Van <chrisvan.vshmr@gmail.com> | <chris.legaxy@gmail.com>
 * @copyright    CPC
 * @since        1.0.0
 * @version      1.0.0
 */

import { NestExpressApplication } from '@nestjs/platform-express';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import Log from './Log';
import { allowedOrigins } from '../cors.origin';

export class Security {
  public static async mount(
    _express: NestExpressApplication
  ): Promise<NestExpressApplication> {
    await Log.info('HTTP Security :: Booting');

    await _express.enableCors({
      origin: allowedOrigins
    });

    await _express.use(helmet());

    await _express.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
      })
    );

    await Log.info('HTTP Security :: Booted Succesfully');

    return await _express;
  }
}
