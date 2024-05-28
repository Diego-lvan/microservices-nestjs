import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ServerConstants } from './constants/server.constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,{
    transport: Transport.TCP,
    options: {
      host: ServerConstants.MICROSERVICE_HOST,
      port: ServerConstants.MICROSERVICE_PORT
    },
  });
  app.listen();
  console.log('Microservice listening on port '+ ServerConstants.MICROSERVICE_PORT);
}
bootstrap();
