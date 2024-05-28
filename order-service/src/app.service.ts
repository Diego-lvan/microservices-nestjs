import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { map } from 'rxjs';

const logger = new Logger();

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @Inject('SERVICE_PAYMENT') private readonly clientPayMicroservice: ClientProxy,
  ){}

  async createOrder(payload: any){
    const newOrder = this.orderRepository.create();
    newOrder.name = payload.name;
    newOrder.phone = payload.phone;
    newOrder.price = payload.price;

    await this.orderRepository.save(newOrder);

    logger.log('New order created with id '+ newOrder.orderId)

    return newOrder;
  }

  async find(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({where: {orderId: parseInt(orderId,10)}});

    if(!order){
      throw new RpcException('Order not found');
    }

    logger.log('Order was found');

    return order;
  }

  async all(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async cancel(orderId: number): Promise<UpdateResult> {
    const order = await this.orderRepository.findOne({where : {orderId: orderId}});

    if(!order){
      throw new RpcException('Order not found');
    }

    return this.orderRepository.update(
      {orderId},
      {status: "CANCELLED", updateTimestamp: new Date()},
    );
  }

  async confirm(orderId:number, paymentData: any): Promise<UpdateResult>{
    return this.orderRepository.update(
      {orderId},
      {
        status: paymentData.status === 'DECLINED' ? 'CANCELED': 'CONFIRMED',
        updateTimestamp: new Date(),
        paymentId: paymentData.id
      }
    )
  }

  async pay(orderId: number){
    const order = await this.orderRepository.findOne({where: {orderId: orderId}});
    const self = this;

    if(!order){
      throw new RpcException("Order not found");
    }

    const pattern = {cmd: 'pay'};
    const payload = {id: orderId, orderData: order};

    logger.log('Prepare payment for order with id ' + order.orderId);

    return this.clientPayMicroservice
    .send<string>(pattern, payload)
    .pipe(
      map((message: any) => {
        this.confirm(orderId, message);

        switch(message.status){
          case 'DECLINED':
            logger.log('Status order: CANCELED');
            break;
          default :
            logger.log('Status order: CONFIRMED');
            logger.log('Please wait 5 seconds to deliver order...');

            setTimeout(() => {
              this.orderRepository.update(
                {orderId},
                {
                  status: 'DELIVERED',
                  updateTimestamp: new Date()
                }
              );
              logger.log('Status order: DELIVERED');
            }, 5000);
            break;
        }

        return message;
      })
    )
  }
}
