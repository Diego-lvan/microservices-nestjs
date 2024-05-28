import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Maneja los mensajes con el comando 'pay'
   * @param data Datos recibidos con el mensaje.
   * @returns El resultado de la llamada al método pay del servicio.
   */
  @MessagePattern({ cmd: 'pay' })
  pay(data: any){
    return this.appService.pay(data);
}

  /**
   * Maneja los mensajes con el comando 'all'
   * @param data Datos recibidos con el mensaje.
   * @returns El resultado de la llamada al método getHello del servicio.
   */
  @MessagePattern({ cmd: 'all'})
  all(data:any) {
    return this.appService.all();
  }
}
