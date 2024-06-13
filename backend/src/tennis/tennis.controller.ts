import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TennisService } from './tennis.service';
import { CreateTennisDto } from './dto/create-tennis.dto';
import { UpdateTennisDto } from './dto/update-tennis.dto';

@Controller('tennis')
export class TennisController {
  constructor(private readonly tennisService: TennisService) {}

  @Post()
  create(@Body() createTennisDto: CreateTennisDto) {
    return this.tennisService.create(createTennisDto);
  }

  @Get()
  findAll() {
    return this.tennisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tennisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTennisDto: UpdateTennisDto) {
    return this.tennisService.update(+id, updateTennisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tennisService.remove(+id);
  }
}
