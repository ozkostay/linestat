import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { BasketballService } from './basketball.service';
import { ResultPipe } from './result.pipe';
import { FromResulttPipe } from './dto/fromResultPipe.dto';
import { ResultService } from './results.service';

@Controller('basketball')
export class BasketballController {
  constructor(
    private readonly basketballService: BasketballService,
    private readonly resultService: ResultService,
  ) {}

  @Post('pars')
  async receivFromPars(@Body() body: any) {
    console.log('controller basketball body =', body);
    const fromSevice = await this.basketballService.receivFromPars(body);
    console.log('Баскетбол обработан! >', Date());
    return { message: 'Controller basketball KO!' };
  }

  @UsePipes(ResultPipe)
  @Post('results') // Receiving Data from result
  async receivFromResults(
    @Body() bodyFromPipe: FromResulttPipe[],
  ): Promise<any> {
    console.log('controller receivFromResults HOCKEY ', bodyFromPipe[1]);
    // console.log('controller receivFromResults OK');
    return { aaa: 'HOCKEY controller OK!!!'}

    ///return await this.resultService.addResultsToGames(bodyFromPipe);
  }
}
