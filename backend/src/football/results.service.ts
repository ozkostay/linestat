import { Injectable } from '@nestjs/common';
// import { Tennis } from './entities/tennis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinesDto } from './dto/lines.dto';
import { FindLinesDto } from './dto/findlines.dto';
import { CreateDto } from './dto/create.dto';
import { FromResulttPipe } from './dto/fromResultPipe.dto';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ResultService {
  constructor(private readonly httpService: HttpService) {}

  async addResultsToGames(body: FromResulttPipe[]): Promise<any> {
    console.log(
      'FOOTBALL SERVICE addResultsToGames() LENGTH ',
      body.length,
      body,
    );

    // return { status: 200, message: 'Tennis  SERVICE addResultsToGames Ok' };

    const sendResultInGames = async () => {
      const resultsSport$ = this.httpService.post(
        `${process.env.HOST_SERVICE_GAMES}:${process.env.SERVICE_PORT_GAMES}/results`,
        {
          body: body,
        },
      );

      const response: AxiosResponse<any, any> =
        await lastValueFrom(resultsSport$); // Observable => Promis
      const data: object = await response.data;
      // console.log('DATA333', data);
      return data;
    };

    const dataFromGames = await sendResultInGames();
    console.log('RESULTS dataFromGames)= ', dataFromGames);

    return { status: 200, message: 'FOOTBALL SERVICE addResultsToGames Ok' };
  }
}
