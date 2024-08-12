import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { TennisService } from './tennis.service';
import { BodyFromParsing } from './dto/bodyFromParsing.dto';
import { LinesDto } from './dto/lines.dto';
import { LinesService } from './lines.service';
import { ResultPipe } from './result.pipe';
import { FromResulttPipe } from './dto/fromResultPipe.dto';
import { ResultService } from './results.service';

@Controller('tennis')
export class TennisController {
  constructor(
    private readonly tennisService: TennisService,
    private readonly linesService: LinesService,
    private readonly resultService: ResultService,
  ) {}

  @Post()
  create(@Body() createTennisDto: any): any {
    return { kkk: 'ok-200' };
  }
  @Post('pars') // Receiving Data from parsing
  receivFromPars(@Body() bodyFromParsing: LinesDto[]): any {
    console.log('controller', bodyFromParsing[1]);
    return this.tennisService.receivFromPars(bodyFromParsing);
  }

  @Post('onelinetest') // test
  receivFromLines(@Body() bodyFromParsing: LinesDto): any {
    console.log('controller one line', bodyFromParsing);
    return this.linesService.addOneLine(bodyFromParsing);
  }

  @UsePipes(ResultPipe)
  @Post('results') // Receiving Data from result
  async receivFromResults(@Body() bodyFromPipe: FromResulttPipe[]): Promise<any> {
    // console.log('controller receivFromResults', bodyFromPipe);
    // console.log('controller receivFromResults OK');
    return await this.resultService.addResultsToGames(bodyFromPipe);
  }

  @Get()
  findAll() {
    return this.tennisService.findAll();
  }

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
