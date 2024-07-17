import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async main(@Body() body: any): Promise<any> {
    console.log('BODY', body);
    // const turnament = { id: 1, name: 'Nam of turnament'}
    const turnament = await this.appService.getTurnament(body);
    return turnament;
  }

  
}
