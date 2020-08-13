import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  secured: process.env.APP_SECURE || false,
  host: process.env.APP_HOST || 'localhost',
  port: parseInt(process.env.APP_PORT) || 3000
}));
