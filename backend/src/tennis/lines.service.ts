import { Injectable } from '@nestjs/common';
import { BodyFromParsing } from './dto/bodyFromParsing.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Tennis } from './entities/tennis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinesDto } from './dto/lines.dto';
import { FindLinesDto } from './dto/findlines.dto';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class LinesService {
  constructor(
    @InjectRepository(Tennis)
    private tennisRepository: Repository<Tennis>,
  ) {}

  async createLine(objLine: CreateDto) {
    console.log('createLines', objLine);
    const newLine = this.tennisRepository.create(objLine);
    return await this.tennisRepository.save(newLine);
  }

  async findLines(objLine: LinesDto): Promise<any> {
    console.log('findLines', objLine.gameId);
    const objToFind: FindLinesDto = {
      gameId: objLine.gameId,
    };
    const response = await this.tennisRepository.findOneBy(objToFind);
    if (response) {
      return response;
    } else {
      const objToCreate: CreateDto = {
        timestamp: new Date(),
        gameId: objLine.gameId,
        win1_odds: objLine.win1_odds,
        win2_odds: objLine.win2_odds,
        handicap1_value: objLine.handicap1_value,
        handicap1_odds: objLine.handicap1_odds,
        handicap2_value: objLine.handicap2_value,
        handicap2_odds: objLine.handicap2_odds,
        total_value: objLine.total_value,
        total_under_odds: objLine.total1_odds,
        total_over_odds: objLine.total2_odds,
      };
      return await this.createLine(objToCreate);
    }
  }
  

  async addLines(objLinesIncomming: any) {
    console.log('Tennis Lines arrLines', objLinesIncomming.arrLines[1]);
    const { arrLines } = objLinesIncomming;
    for await (const i of arrLines) {
      console.log('=== i.gameId', i.gameId);
      const temp = Object.assign(i);
      const res = await this.findLines(i);
      // temp.gameId = res.id;
    }
    return 'Tennis Lines Ok';
  }
}
