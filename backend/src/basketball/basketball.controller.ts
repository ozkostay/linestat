import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { BasketballService } from './basketball.service';

@Controller('basketball')
export class BasketballController {
  constructor(private readonly basketballService: BasketballService) {}

  @Post('pars')
  async receivFromPars(@Body() body: any) {
    console.log('controller basketball body =', body);
    const fromSevice = await this.basketballService.receivFromPars(body);
    console.log('basketball controller fromService', fromSevice);
    return { message: 'Controller basketball KO!' };
  }
  
}
