import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'Awesome Nest App',
  secured: process.env.APP_SECURE || false,
  host: process.env.APP_HOST || 'localhost',
  port: parseInt(process.env.APP_PORT) || 3000,
  secret: process.env.APP_SECRET || 'secret'
}));
