import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DbConstants } from '../constants/db.constants';
import { Order } from 'src/entities/order.entity';

export const ORMconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: DbConstants.DB_HOST,
  port: DbConstants.DB_PORT,
  username: DbConstants.DB_USER,
  password: DbConstants.DB_PASSWORD,
  database: DbConstants.DB_NAME,
  entities: [Order],
  synchronize: DbConstants.DB_SYNC,
  logging: true,
};
