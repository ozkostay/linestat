import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { InFromSport } from './dto/inFromSport.dto';
// import { InPupetResult } from './dto/inPupetResult.dto';

@Injectable()
export class InResultPipe implements PipeTransform {
  constructor() {}

  public transform(inBody: InFromSport, metadata: ArgumentMetadata) {
    const { body } = inBody;
    const arrRetrun = [];
    body.forEach((i: any) => {
      if (!i.result) return;
      arrRetrun.push({
        sport: i.sport,
        turnament: i.turnament,
        player1: i.player1,
        player2: i.player2,
        result: i.result,
        date: i.date,
      });
    });

    return arrRetrun;
  }
}
