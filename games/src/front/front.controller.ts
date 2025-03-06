import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FrontService } from './front.service';


@Controller('front')
export class FrontController {
  constructor(private readonly frontService: FrontService) {}

  // @Post()
  // create(@Body() createFrontDto: CreateFrontDto) {
  //   return this.frontService.create(createFrontDto);
  // }

  // @Get()
  // findAll() {
  //   return this.frontService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.frontService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFrontDto: UpdateFrontDto) {
  //   return this.frontService.update(+id, updateFrontDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.frontService.remove(+id);
  // }

  @Get('empty')
  findAll(@Query() params: any) {
    console.log('contr params', params)
    
    return this.frontService.getEmpty(params);
  }

  @Get('players')
  getPlayerByTurnament(@Query() params: any) {
    console.log('contr params', params);
    const turnamentId = Number(params.turnamentId);
    console.log('tid', turnamentId);
    return this.frontService.getPlayerByTurnament(turnamentId);
  }

  @Get('lines')
  getGamesByTurnamentPlayer(@Query() params: any) {
    console.log('contr params LINES', params);
    // const turnamentId = Number(params.turnamentId);
    // console.log('tid', turnamentId);
    return this.frontService.getGamesByTurnamentPlayer(params);
    // return [ 'aaa', 'bbb'];
  }

}
