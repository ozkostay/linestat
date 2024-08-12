import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FootballService } from './football.service';

@Controller('football')
export class FootballController {
  constructor(private readonly footballService: FootballService) {}

  @Post('pars')
  create(@Body() body: any) {
    console.log('controller football body =', body);
    return { message: 'Controller football KO!' };
  }

  @Get()
  findAll() {
    return this.footballService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.footballService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFootballDto: UpdateFootballDto) {
  //   return this.footballService.update(+id, updateFootballDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.footballService.remove(+id);
  // }
}
