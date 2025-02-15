import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { InFromSport } from './dto/inFromSport.dto';
// import { InPupetResult } from './dto/inPupetResult.dto';

@Injectable()
export class InOneResultPipe implements PipeTransform {
  constructor() {}

  public transform(oneResult: { id: any; result: any; date: any }, metadata: ArgumentMetadata) {
    console.log("PIPE!!! === ", oneResult);
    oneResult.date = new Date();
    return oneResult;
  }
}
