/**
 * @file Http Middleware
 *
 * @description
 *    Nest Express's Http Bootstrap Middleware
 *
 * @author       Chris Van <chrisvan.vshmr@gmail.com> | <chris.legaxy@gmail.com>
 * @copyright    CPC
 * @since        1.0.0
 * @version      1.0.0
 */

import { NestExpressApplication } from '@nestjs/platform-express';

import morgan from 'morgan';
import compression from 'compression';
import * as rfs from 'rotating-file-stream';

import Log from './Log';

import path from 'path';

export class Http {
  public static async mount(
    _express: NestExpressApplication
  ): Promise<NestExpressApplication> {
    await Log.info('HTTP Middleware :: Booting');

    await _express.use(compression());

    await _express.use(
      morgan('combined', {
        stream: rfs.createStream(
          `${new Date().getFullYear()}-${new Date().getMonth() +
            1}-${new Date().getDate()}.log`,
          {
            interval: '1d',
            path: path.join('.logs/access')
          }
        )
      })
    );

    await Log.info('HTTP Middleware :: Booted Succesfully');

    return await _express;
  }
}
