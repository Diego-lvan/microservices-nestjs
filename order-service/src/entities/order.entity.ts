import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  price: number;

  @Column({ default: 'NEW' })
  status: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createTimestamp: Date;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updateTimestamp: Date;

  @Column({default:() => 0})
  paymentId: number; 
}