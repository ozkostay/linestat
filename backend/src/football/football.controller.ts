import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
} from '@nestjs/common';
import { FootballService } from './football.service';
import { ResultPipe } from './result.pipe';
import { FromResulttPipe } from './dto/fromResultPipe.dto';
import { ResultService } from './results.service';

@Controller('football')
export class FootballController {
  constructor(
    private readonly footballService: FootballService,
    // private readonly linesService: LinesService,
    private readonly resultService: ResultService,
  ) {}

  @Post('pars')
  async receivFromPars(@Body() body: any) {
    console.log('controller football body =', body);
    const fromSevice = await this.footballService.receivFromPars(body);
    console.log('football controller fromService', fromSevice);
    return { message: 'Controller football KO!' };
  }

  @UsePipes(ResultPipe)
  @Post('results') // Receiving Data from result
  async receivFromResults(
    @Body() bodyFromPipe: FromResulttPipe[],
  ): Promise<any> {
    console.log('controller receivFromResults football ', bodyFromPipe[1]);
    // console.log('controller receivFromResults OK');
    // return { aaa: 'football controller OK!!!'}

    return await this.resultService.addResultsToGames(bodyFromPipe);
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
