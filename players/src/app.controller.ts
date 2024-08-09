import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BodyPlayers } from './dto/bodyplayers.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  // // findOne(@Param('id') id: string) {
  // //   return this.tennisService.findOne(+id);
  // // }

  @Get()
  async getShortNameById(@Param('id') id: string): Promise<any> {
    const shortName = await this.appService.getShortNameById(Number(id));
    console.log('ID', id, 'name ', shortName  );
    return shortName;
    // return { status: 200 }
  }

  @Post()
  async main(@Body() body: BodyPlayers): Promise<any> {
    console.log('BODY', body);
    // const turnament = { id: 1, name: 'Nam of turnament'}
    const player = await this.appService.getPlayers(body);
    return player;
  }
}
