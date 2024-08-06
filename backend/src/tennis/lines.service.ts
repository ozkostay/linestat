import { Injectable } from '@nestjs/common';
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

  objectComparison(obj1: CreateDto, obj2: CreateDto) {
    console.log('DDDDDDD', typeof obj1.win1_odds);
    console.log('DDDDDDDD', typeof obj2.win1_odds);
    // console.log('DDDDDDDDDD', 'games 1', obj1.gameId, '2', obj2.gameId);
    console.log('DDDDDDDDDD', '1', obj1.win1_odds, '2', obj2.win1_odds);
    if (
      // obj1.gameId === obj2.gameId &&
      obj1.game_id === obj2.game_id &&
      obj1.win1_odds === obj2.win1_odds &&
      obj1.win2_odds === obj2.win2_odds &&
      obj1.handicap1_value === obj2.handicap1_value &&
      obj1.handicap1_odds === obj2.handicap1_odds &&
      obj1.handicap2_value === obj2.handicap2_value &&
      obj1.handicap2_odds === obj2.handicap2_odds &&
      obj1.total_value === obj2.total_value &&
      obj1.total_under_odds === obj2.total_under_odds &&
      obj1.total_over_odds === obj2.total_over_odds
    ) {
      console.log('объекты РАВНЫ!!!');
      return true;
    } else {
      console.log('объекты НЕ РАВНЫ!!!');
      return false;
    }
  }

  async createLine(objLine: CreateDto) {
    const newLine = this.tennisRepository.create(objLine);
    return await this.tennisRepository.save(newLine);
  }

  async findLines(objLine: LinesDto): Promise<any> {
    console.log('findLines', objLine.game_id);
    const objToFind: FindLinesDto = {
      // gameId: objLine.gameId,
      game_id: objLine.game_id,
    };
    
    const response = await this.tennisRepository.findOne({
      where: objToFind,
      order: { timestamp: "DESC" }
    });
    
    const objToCreate: CreateDto = {
      timestamp: new Date(),
      // gameId: objLine.gameId,
      game_id: objLine.game_id,
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
    
    if (response && this.objectComparison(response, objToCreate)) {
      return response;
    } else {
      return await this.createLine(objToCreate);
    }
  }

  async addLines(objLinesIncomming: any) {
    console.log('Tennis Lines arrLines', objLinesIncomming.arrLines[1]);
    const { arrLines } = objLinesIncomming;
    for await (const i of arrLines) {
      console.log('=== i.gameId', i.gameId);
      const temp = Object.assign(i);
      temp.game_id = i.gameId;
      delete temp.gameId;
      const res = await this.findLines(i);
    }
    console.log('Все линии обработаны!');
    return 'Tennis Lines Ok';
  }

  // === Для отладки
  async addOneLine(objLinesIncomming: LinesDto) {
    console.log('Tennis One Lines objLinesIncomming', objLinesIncomming);
    const res = await this.findLines(objLinesIncomming);
    return 'Tennis One Lines Ok';
  }
}
