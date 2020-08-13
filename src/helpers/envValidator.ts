import { exit } from 'process';

const envs = ['development', 'production', 'test', 'provision'];

export const envValidator = (nodeEnv: string): void => {
  if (nodeEnv && !envs.includes(nodeEnv)) {
    console.log(
      '\x1b[31m%s\x1b[0m',
      'NODE_ENV must be either development, test, provision or production'
    );

    exit();
  }
};
