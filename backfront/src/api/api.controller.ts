import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  findAll() {
    return this.apiService.findAll();
  }

  @Get('lines')
  async getLines(@Query() params: any): Promise<any> {
    return this.apiService.getLines(params);
  }

  @Get('players')
  getPlayerByTurnament(@Query() params: any): Promise<any> {
    // console.log('contr params', params);
    const turnamentId = params.turnamentId;
    // console.log('tid', turnamentId);
    return this.apiService.getPlayerByTurnament(turnamentId);
  }

  @Get('turnaments')
  async getTurnamentsBySportId(@Query() params: any): Promise<any> {
    const sportId = Number(params.sportId);
    const turnaments = await this.apiService.getTurnamentsBySportId(sportId);
    return turnaments;
  }

  @Post('oneresult')
  async writeOneResult(
    @Body() oneResult: { id: any; result: any; date: any },
  ): Promise<any> {
    console.log('На входе в writ  eOneResult() ', oneResult);
    const game = await this.apiService.writeOneResult(oneResult);
    return game;
  }

  @Get('games')
  getGames(@Query() params: any): Promise<any> {
    console.log('==== prams', params);
    return this.apiService.getGames(params);
  }
}
