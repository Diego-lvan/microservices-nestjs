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
}