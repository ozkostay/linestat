import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TennisService } from './tennis.service';
import { BodyFromParsing } from './dto/bodyFromParsing.dto';

@Controller('tennis')
export class TennisController {
  constructor(private readonly tennisService: TennisService) {}

  @Post()
  create(@Body() createTennisDto: any): any {
    return { kkk: "ok-200"};
  }

  @Post('pars') // Receiving Data from parsing
  receivFromPars(@Body() bodyFromParsing: BodyFromParsing[]): any {
    return this.tennisService.receivFromPars(bodyFromParsing);
  }


  // @Get()
  // findAll() {
  //   return this.tennisService.findAll();
  // }

  // // @Get(':id')
  // // findOne(@Param('id') id: string) {
  // //   return this.tennisService.findOne(+id);
  // // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTennisDto: UpdateTennisDto) {
  //   return this.tennisService.update(+id, updateTennisDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tennisService.remove(+id);
  // }
}
