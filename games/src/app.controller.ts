import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ResultsService } from './results.service';

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

  @Post('results')
  async addResults(@Body() body: any): Promise<any> {
    const { arrResults } = body;
    console.log('GAME CONTROLLER RESULTs BODY', arrResults[0]);
    const game = await this.resultsService.addResults(arrResults);
    return game;
  }
}
