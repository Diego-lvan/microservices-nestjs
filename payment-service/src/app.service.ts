import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

const logger = new Logger();
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  /**
   * Procesa un pago y guarda la información en la base de datos.
   * @param paramData Datos del pedido para procesar el pago.
   * @returns Retorna la información del pago procesado.
   */
  async pay(paramData: any) {
    //Registra un mensaje de log indicando el ID del pedido.
    logger.log('Payment for orderId: ' + paramData.orderData.id);

    const payment = this.paymentRepository.create();
    payment.orderId = paramData.orderData.id;
    payment.price = paramData.orderData.price;
    payment.status = Math.random() >= 0.5 ? 'CONFIRMED' : 'DECLINED';
    await this.paymentRepository.save(payment);
    logger.log('Payment status: ' + payment.status);   
    
    return payment;
  }

  /**
   * Obtiene todos los pagos registrados en la base de datos.
   * @returns Regresa una lista de todos los pagos registrados.
   */
  async all(): Promise<Payment[]> {
    logger.log('Return all order');

    return await this.paymentRepository.find();
  }
}
