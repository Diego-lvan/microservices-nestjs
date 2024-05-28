import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap');

/**
 * Función asincrónica para inicializar el
 */
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3002,
    },
  });

  //Inicio de microservicio
  await app.listen();
  logger.log('Microservice Payment is listening');
}
bootstrap();
