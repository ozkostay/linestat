import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { ResultsService } from './results.service';
import { InFromSport } from './dto/inFromSport.dto';
import { InResultPipe } from './in.result.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly resultsService: ResultsService, ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async main(@Body() body: any): Promise<any> {
    // console.log('BODY', body);
    const game = await this.appService.getGames(body);
    return game;
  }

  @UsePipes(InResultPipe)
  @Post('results')
  async addResults(@Body() arrResults: any[]): Promise<any> {
    console.log('GAME CONTROLLER RESULTs BODY', arrResults);
    
    const game = await this.resultsService.addResults(arrResults);
    // const game = {aaa:111}
    return game;
  }

  @Get('onegame/:id')
  async getOneGame(@Param() id: { id: string }): Promise<any> {
    const gameId: number = Number(id.id);
    return this.appService.getOneGame(gameId);
  }
}
