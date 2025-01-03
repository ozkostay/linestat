import { Controller, Get, Post, Body, Patch, Param, Delete, Query  } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  findAll() {
    return this.apiService.findAll();
  }

  @Get('games')
  getGames(@Query() params: any) {
    console.log('==== prams', params);
    return this.apiService.getGames(params);
  }

  @Get('gtur/:id')
  getTurnaments(@Param() id: {id: string}) {
    console.log('param', id);

    return this.apiService.getTurnaments(Number(id.id));
  }

}
