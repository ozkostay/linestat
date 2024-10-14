import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getgame/:id')
  getGame(@Param() id: { id: string }): Promise<any> {
    const gameId = id.id;
    return this.appService.getGame(gameId);
  }

}
