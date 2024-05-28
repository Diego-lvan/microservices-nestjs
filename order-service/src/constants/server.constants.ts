import * as dotenv from 'dotenv';
dotenv.config();

export class ServerConstants {
  static SERVICE_PAYMENT_PORT: number = 3002;
  static HOST: string = `${process.env.SERVER_HOST || 'http://localhost'}:${this.SERVICE_PAYMENT_PORT}`;
  static MICROSERVICE_PORT: number = 3001;
  static MICROSERVICE_HOST: string = 'localhost';
}
