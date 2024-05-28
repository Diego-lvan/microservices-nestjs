import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { config } from './orm.config';

@Module({
  imports: [
    //Configura TypeORM usando la configuracion definida en orm.config.ts
    TypeOrmModule.forRoot(config),
    //Registra la entidad Payment
    TypeOrmModule.forFeature([Payment]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
