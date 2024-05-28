import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Payment } from './payment.entity';

export const config: TypeOrmModuleOptions = {
  type: 'mysql',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'payment',
  host: 'mysql-payment',
  entities: [Payment],
  synchronize: true,
  retryAttempts: 100,
  retryDelay: 5000,
};
