import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { InPupetResult } from './dto/inPupetResult.dto';
import { TransformDate } from './transformDate';

@Injectable()
export class ResultPipe implements PipeTransform {
  constructor(
    private readonly transformDate: TransformDate,
  ) {}

  public transform(body: InPupetResult[], metadata: ArgumentMetadata) {
    const arrTemp = [];
    body.forEach((i: any, index) => {
      if (i.players.includes('/')) {
        return;
      }
      const players = this.transformPlayers(i.players);
      const newModyfiResult = {
        player1: players.player1,
        player2: players.player2,
        result: i.result,
        date: this.transformDate.transformDate(i.dataResult),
      };
      arrTemp.push(newModyfiResult);
    });
    
    return arrTemp;
  }

  private transformPlayers(strData: string): {
    player1: string;
    player2: string;
  } {
    const arrPlayers = strData.split(' - ');

    return { player1: arrPlayers[0], player2: arrPlayers[1] };
  }
}

