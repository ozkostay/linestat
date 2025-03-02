import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! BACKFRONT! :-)';
  }

  // async getPlayerByTurnament(turnamentId: string): Promise<any> {
  //   const url = `${process.env.HOST_SERVICE_GAMES}:${process.env.SERVICE_PORT_GAMES}/players?turnamentId=${turnamentId}}`;
  //   console.log('url', url);
  //   return { ccc: url}
  // }
}
