import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('arrparam')
  getWithArrParam(): any {
    return this.appService.getWithArrParam();
  }

  @Post()
  async main(@Body() body: any): Promise<any> {
    console.log('BODY', body);
    // const turnament = { id: 1, name: 'Nam of turnament'}
    const turnament = await this.appService.getTurnament(body);
    return turnament;
  }

  @Get('oneturnament/:id')
  async getOneTurnament(@Param() id: { id: string }): Promise<any> {
    const turnamentId = Number(id.id);
    const oneTurnament = await this.appService.getOneTurnament(turnamentId);
    return oneTurnament;
  }

  @Get('turnaments')
  async getTurnamentsBySportId(@Query() params: any): Promise<any> {
    // console.log('333===', params);
    const sportId = Number(params.sportId);
    const turnaments = this.appService.getTurnamentsBySportId(sportId);
    return turnaments;
    // console.log('333');
  }
}
