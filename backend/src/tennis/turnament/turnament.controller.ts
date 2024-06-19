import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TurnamentService } from './turnament.service';
import { CreateTurnamentDto } from './dto/create-turnament.dto';
import { UpdateTurnamentDto } from './dto/update-turnament.dto';


@Controller('turnament/tennis')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnamentService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTurnamentDto: UpdateTurnamentDto) {
  //   return this.turnamentService.update(+id, updateTurnamentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.turnamentService.remove(+id);
  // }
}
