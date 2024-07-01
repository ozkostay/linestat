import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TurnamentService } from './turnament.service';
import { CreateTurnamentDto } from './dto/create-turnament.dto';
import { UpdateTurnamentDto } from './dto/update-turnament.dto';
import { FindOneTurnamentDto } from './dto/findOne-turnament.dto';
import { Surface } from '../surface/entities/surface.entity';


@Controller('tennis/turnament')
export class TurnamentController {
  constructor(private readonly turnamentService: TurnamentService) {}
  
  // === Turnament
  @Post()
  create(@Body() createTurnamentDto: CreateTurnamentDto) {
    return this.turnamentService.create(createTurnamentDto);
  }

  @Get()
  findAll() {
    return this.turnamentService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   console.log('id', id);
  //   // return this.turnamentService.findOne(+id);
  // }

  @Get('findbyname')
  async findByName(@Query() query: { name: string, surface: string }): Promise<any> {
    console.log('cont turn', query.name, query.surface)
    return 'ddddddddddd'
  }
  
  // @Get('findbyname')
  // findByName(): any {
  //   console.log('cont turn');
  //   return 'ddddddddddd2';
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTurnamentDto: UpdateTurnamentDto) {
  //   return this.turnamentService.update(+id, updateTurnamentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.turnamentService.remove(+id);
  // }
}
