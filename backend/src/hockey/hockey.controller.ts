import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
} from '@nestjs/common';
import { HockeyService } from './hockey.service';
import { ResultPipe } from './result.pipe';
import { FromResulttPipe } from './dto/fromResultPipe.dto';
import { ResultService } from './results.service';

@Controller('hockey')
export class HockeyController {
  constructor(
    private readonly hockeyService: HockeyService,
    private readonly resultService: ResultService,
  ) {}

  @Post('pars')
  async receivFromPars(@Body() body: any) {
    // console.log('controller football body =', body);
    const fromSevice = await this.hockeyService.receivFromPars(body);
    console.log('HOCKEY controller fromService', fromSevice);
    return { message: 'Controller hockey KO!' };
  }

  @UsePipes(ResultPipe)
  @Post('results') // Receiving Data from result
  async receivFromResults(
    @Body() bodyFromPipe: FromResulttPipe[],
  ): Promise<any> {
    console.log('controller receivFromResults HOCKEY ', bodyFromPipe[1]);
    // console.log('controller receivFromResults OK');
    // return { aaa: 'HOCKEY controller OK!!!'}

    return await this.resultService.addResultsToGames(bodyFromPipe);
  }
}
