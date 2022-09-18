import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly datasource: DataSource) {}
  getHello(): string {
    return 'Hello World!';
  }

  test() {
    console.log();
  }
}
