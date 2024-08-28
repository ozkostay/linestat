import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HockeyService } from './hockey.service';
// import { CreateHockeyDto } from './dto/create-hockey.dto';
// import { UpdateHockeyDto } from './dto/update-hockey.dto';

@Controller('hockey')
export class HockeyController {
  constructor(private readonly hockeyService: HockeyService) {}

  @Post('pars')
  async receivFromPars(@Body() body: any) {
    // console.log('controller football body =', body);
    const fromSevice = await this.hockeyService.receivFromPars(body);
    console.log('football controller fromService', fromSevice);
    return { message: 'Controller hockey KO!' };
  }
}
