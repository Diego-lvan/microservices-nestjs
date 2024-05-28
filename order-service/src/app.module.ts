import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ORMconfig } from './configs/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServerConstants } from './constants/server.constants';

@Module({
  imports: [
    TypeOrmModule.forRoot(ORMconfig),
    TypeOrmModule.forFeature([Order]),
    ClientsModule.register([
      {
        name: "SERVICE_PAYMENT",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: ServerConstants.SERVICE_PAYMENT_PORT
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
