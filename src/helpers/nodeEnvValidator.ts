/**
 * @file nodeEnvValidator
 *
 * @description
 *    Check if NODE_ENV is valid
 *
 * @author       Chris Van <chrisvan.vshmr@gmail.com> | <chris.legaxy@gmail.com>
 * @copyright    CPC
 * @since        1.0.0
 * @version      1.0.0
 */

import { exit } from 'process';

const envs = ['development', 'production', 'test', 'provision'];

export const nodeEnvValidator = (nodeEnv: string): void => {
  if (nodeEnv && !envs.includes(nodeEnv)) {
    console.log(
      '\x1b[31m%s\x1b[0m',
      'NODE_ENV must be either development, test, provision or production'
    );

    exit();
  }
};
