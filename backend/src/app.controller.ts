import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LogService } from './log.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logService: LogService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getgame/:id')
  getGame(@Param() id: { id: string }): Promise<any> {
    const gameId = id.id;
    return this.appService.getGame(gameId);
  }

  @Get('gamesbyplayerid/:id')
  gamesByPlayerId(@Param() id: { id: string }): any {
    const playerId = id.id;
    return this.appService.gamesByPlayerId(playerId);
  }

  @Post('log')
  logBody(@Body() body: any): any {
    console.log('Body', JSON.stringify(body));
    return this.logService.logBody(body);
    // return 'LOG';
  }
}
