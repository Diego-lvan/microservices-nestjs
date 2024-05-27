import * as dotenv from 'dotenv';
dotenv.config();

export class ServerConstants {
  static PORT: number = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3002;
  static HOST: string = `${process.env.SERVER_HOST || 'http://localhost'}:${this.PORT}`;
}
