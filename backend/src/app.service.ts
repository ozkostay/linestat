import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('Hello World! I am LINESTAT!!!');
    return 'Hello World! I am LINESTAT!!!';
  }
}
