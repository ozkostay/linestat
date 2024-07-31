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
import { LinesDto } from './dto/lines.dto';
import { LinesService } from './lines.service';

@Controller('tennis')
export class TennisController {
  constructor(private readonly tennisService: TennisService, private readonly linesService: LinesService) {}

  @Post()
  create(@Body() createTennisDto: any): any {
    return { kkk: "ok-200"};
  }

  @Post('pars') // Receiving Data from parsing
  receivFromPars(@Body() bodyFromParsing: LinesDto[]): any {
    console.log('controller', bodyFromParsing[1]);
    return this.tennisService.receivFromPars(bodyFromParsing);
  }

  @Post('onelinetest') // Receiving Data from parsing
  receivFromLines(@Body() bodyFromParsing: LinesDto): any {
    console.log('controller one line', bodyFromParsing);
    return this.linesService.addOneLine(bodyFromParsing);
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
