import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICE_ORDER',
        transport: Transport.TCP,
        options: { host: 'order', port: 3001 },
      },

      {
        name: 'SERVICE_PAYMENT',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
