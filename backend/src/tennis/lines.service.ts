import { Injectable } from '@nestjs/common';
import { BodyFromParsing } from './dto/bodyFromParsing.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LinesService {
  constructor(private readonly httpService: HttpService) {
    // private readonly turnamentService: TurnamentService,
  }

  async addLines(arrLinesIncomming: any) {
    console.log('Tennis Lines arrLines', arrLinesIncomming[1])
    return 'Tennis Lines Ok'
  }
 
}
