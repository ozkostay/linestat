import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BodyGames } from './dto/bodyGames.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async main(@Body() body: BodyGames): Promise<any> {
    console.log('controler BODY', body);
    // const turnament = { id: 1, name: 'Nam of turnament'}
    const turnament = await this.appService.getGames(body);
    return turnament;
  }
}
