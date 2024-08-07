import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { InPupetResult } from './dto/inPupetResult.dto';

@Injectable()
export class ResultPipe implements PipeTransform {
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
        date: this.transformDate(i.dataResult),
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

  private transformDate(strData: string): Date {
    const months = new Map();
    months.set('янв.', '01');
    months.set('фев.', '02');
    months.set('мар.', '03');
    months.set('апр.', '04');
    months.set('май.', '05');
    months.set('июн.', '06');
    months.set('июл.', '07');
    months.set('авг.', '08');
    months.set('сен.', '09');
    months.set('окт.', '10');
    months.set('ноя.', '11');
    months.set('дек.', '12');

    const arrDate = strData.split(" ");
    const dayTemp = arrDate[2] ? arrDate[0] : new Date().getDate();
    const monthTemp = arrDate[2]
      ? months.get(arrDate[1])
      : new Date().getMonth();
    const yearTemp = new Date().getFullYear();
    const timeTemp = arrDate[2] ? arrDate[2] : arrDate[0];

    // console.log(months.get(arrDate[1]));

    const tempDateString = `${dayTemp}.${monthTemp}.${yearTemp} ${timeTemp}`;
    return new Date(tempDateString);
  }
}

// const months = new Map();
// months.set('янв.','01');
// months.set('фев.','02');
// months.set('мар.','03');
// months.set('апр.','04');
// months.set('май.','05');
// months.set('июн.','06');
// months.set('июл.','07');
// months.set('авг.','08');
// months.set('сен.','09');
// months.set('окт.','10');
// months.set('ноя.','11');
// months.set('дек.','12');

// const inDate = "06 авг. 11:00";
// const arrDate = inDate.split(" ");
// console.log(months.get(arrDate[1]));
// tempDateString = arrDate[0] + '.' + months.get(arrDate[1]) + '.' + new Date().getFullYear() + ' ' +  arrDate[2]
// console.log(tempDateString);
// console.log(new Date(tempDateString));
