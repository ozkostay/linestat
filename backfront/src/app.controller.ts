import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('players')
  // getPlayerByTurnament(@Query() params: any) {
  //   // console.log('contr params', params);
  //   const turnamentId = params.turnamentId;
  //   // console.log('tid', turnamentId);
  //   return this.appService.getPlayerByTurnament(turnamentId);
  // }
}
