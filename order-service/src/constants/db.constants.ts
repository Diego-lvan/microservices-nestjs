import * as dotenv from 'dotenv';
dotenv.config();
export class DbConstants {
  static DB_HOST: string = process.env.DB_HOST || 'localhost';
  static DB_PORT: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3302;
  static DB_USER: string = process.env.DB_USER || 'root';
  static DB_PASSWORD: string = process.env.DB_PASSWORD || 'root';
  static DB_NAME: string = process.env.DB_NAME || 'orders_DB';
  static DB_SYNC: boolean = true;
}