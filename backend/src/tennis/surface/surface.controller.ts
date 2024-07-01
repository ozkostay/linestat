import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { SurfaceService } from './surface.service';
import { CreateSurfaceDto } from './dto/create-surface.dto';
import { UpdateSurfaceDto } from './dto/update-surface.dto';

@Controller('tennis/surface')
export class SurfaceController {
  constructor(private readonly surfaceService: SurfaceService) {}

  // @Post()
  // create(@Body() createSurfaceDto: CreateSurfaceDto) {
  //   console.log('=createSurfaceDto==', createSurfaceDto);
  //   return this.surfaceService.create(createSurfaceDto);
  // }

  @Get()
  findAll() {
    return this.surfaceService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return await this.surfaceService.findName(name)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSurfaceDto: UpdateSurfaceDto) {
  //   return this.surfaceService.update(+id, updateSurfaceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.surfaceService.remove(+id);
  // }
}
