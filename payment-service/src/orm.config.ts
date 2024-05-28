import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
    type: 'mysql',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'payment',
    host: '',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    retryAttempts: 100,
    retryDelay: 5000
}