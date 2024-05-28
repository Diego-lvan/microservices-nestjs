import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd: 'create'})
  create(data: any){
    return this.appService.createOrder(data);
  }

  @MessagePattern({cmd: 'find'})
  find(orderId: string){
    return this.appService.find(orderId);
  }

  @MessagePattern({cmd: 'all'})
  all(){
    return this.appService.all();
  }

  @MessagePattern({cmd: 'cancel'})
  cancel(orderId: number){
    return this.appService.cancel(orderId);
  }

  @MessagePattern({cmd: 'pay'})
  pay(orderId: number){
    return this.appService.pay(orderId);
  }
}
