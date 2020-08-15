/**
 * @file Bootstrapper
 *
 * @description
 *    For mounting all the middleware bootstraps
 *
 * @author       Chris Van <chrisvan.vshmr@gmail.com> | <chris.legaxy@gmail.com>
 * @copyright    CPC
 * @since        1.0.0
 * @version      1.0.0
 */

import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

import { Http } from './Http';
import { Security } from './Security';
import Log from './Log';

export class Bootstrapper {
  public static async init(
    _express: NestExpressApplication
  ): Promise<NestExpressApplication> {
    await Log.info('Bootstrapper :: Mounting');

    await _express.setGlobalPrefix('v1');

    _express = await Http.mount(_express);

    _express = await Security.mount(_express);

    await Log.info('Boostrapper :: Mounted Successfully');

    await Logger.log('Boostrapper succesfully mounted', 'BootstrapLoader');

    return await _express;
  }
}
