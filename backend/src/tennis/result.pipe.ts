import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ResultPipe implements PipeTransform {
  public transform(body: any, metadata: ArgumentMetadata) {
    // console.log('pipe', body[1]);
    const arrTemp = [];
    body.forEach((i: any, index) => {
      if (i.players.includes('/')) {
        return;
      }
      // console.log('idx', index, '===', i.players,'===', i.result,'===',i.dataResult);
      const players = this.transformDate(i.players);
      const newModyfiResult = {
        player1: players.player1,
        player2: players.player2,
        result: i.result,
        date: i.dataResult,
      };
      // console.log(
      //   'idx',
      //   index,
      //   '===',
      //   newModyfiResult.player1,
      //   '===',
      //   newModyfiResult.player2,
      //   '===',
      //   newModyfiResult.result,
      //   '===',
      //   newModyfiResult.date,
      // );
      arrTemp.push(newModyfiResult);
    });
    // console.log('pipe2', arrTemp[1]);
    return arrTemp;
  }

  private transformDate(strData: string): { player1: string; player2: string } {
    const arrPlayers = strData.split(' - ');

    return { player1: arrPlayers[0], player2: arrPlayers[1] };
  }
}

// pipe {
//   players: 'С.Эррани/Ж.Паолини - М.Андреева/Д.Шнайдер',
//   result: '2:1 (2:6, 6:1, 1:0)',
//   dataResult: '04 авг. 18:55'
// }
