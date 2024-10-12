import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    this.logToFile('Тест лога');
    console.log('Hello World! I am LINESTAT!!!\n');
    return 'Hello World! I am LINESTAT!!!';
  }

  logToFile(content: string) {
    let textrow = `${Date()} ${content}\n`;
    fs.writeFile(`backend.log`, textrow, { flag: 'a' }, (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });
  }
}
