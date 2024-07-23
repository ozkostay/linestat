import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BodyPlayers } from './dto/bodyplayers.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async main(@Body() body: BodyPlayers): Promise<any> {
    console.log('BODY', body);
    // const turnament = { id: 1, name: 'Nam of turnament'}
    const player = await this.appService.getPlayers(body);
    return player;
  }
}
