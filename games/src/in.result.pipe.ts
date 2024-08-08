import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { InFromSport } from './dto/inFromSport.dto';
// import { InPupetResult } from './dto/inPupetResult.dto';

@Injectable()
export class InResultPipe implements PipeTransform {
  constructor(
    // private readonly transformDate: TransformDate,
  ) {}

  public transform(inBody: InFromSport, metadata: ArgumentMetadata) {
    const { body } = inBody;
    console.log('PIPE BODY', body)
    const arrRetrun = [];
    body.forEach((i: any) => {
      arrRetrun.push({
        player1: i.player1,
        player2: i.player2,
        result: i.result,
        date: new Date(i.date),
      });
    });
    
    return arrRetrun;
  }
}

