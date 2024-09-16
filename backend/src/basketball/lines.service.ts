import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { LinesDto } from './dto/lines.dto';
import { FindLinesDto } from './dto/findlines.dto';
import { Basketball } from 'src/entities/tennis.entity';
// import { Football } from './entities/football.entity';
// import { CreateDto } from './dto/create.dto';
// import { LinesDto } from './dto/lines.dto';
// import { FindLinesDto } from './dto/findlines.dto';

@Injectable()
export class LinesService {
  constructor(
    @InjectRepository(Basketball)
    private footballRepository: Repository<Basketball>,
  ) {}

  objectComparison(obj1: CreateDto, obj2: CreateDto) {
    // console.log('DDDDDDD', typeof obj1.win1_odds);
    // console.log('DDDDDDDD', typeof obj2.win1_odds);
    // console.log('DDDDDDDDDD', 'games 1', obj1.gameId, '2', obj2.gameId);
    // console.log('DDDDDDDDDD', '1', obj1.win1_odds, '2', obj2.win1_odds);
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
      console.log('объекты РАВНЫ!!!    gameId=', obj1.game_id);
      return true;
    } else {
      console.log('объекты НЕ РАВНЫ!!!    gameId=', obj1.game_id);
      return false;
    }
  }

  async createLine(objLine: CreateDto) {
    // console.log('CREATE-1');
    const newLine = this.footballRepository.create(objLine);
    // console.log('CREATE-2');
    return await this.footballRepository.save(newLine);
  }

  async findLines(objLine: LinesDto): Promise<any> {
    // console.log('findLines', objLine.game_id);
    const objToFind: FindLinesDto = {
      game_id: objLine.game_id,
    };
    // console.log('findLines', 2);
    const response = await this.footballRepository.findOne({
      where: objToFind,
      order: { timestamp: "DESC" }
    });
    // console.log('findLines', 3);
    
    const objToCreate: CreateDto = {
      timestamp: new Date(),
      game_id: objLine.game_id,
      win1_odds: objLine.win1_odds,
      win2_odds: objLine.win2_odds,
      handicap1_value: objLine.handicap1_value,
      handicap1_odds: objLine.handicap1_odds,
      handicap2_value: objLine.handicap2_value,
      handicap2_odds: objLine.handicap2_odds,
      total_value: objLine.total_value,
      total_under_odds: objLine.total_under_odds,
      total_over_odds: objLine.total_over_odds,
    };
    // console.log('findLines', 4);
    if (response && this.objectComparison(response, objToCreate)) {
      return response;
    } else {
      return await this.createLine(objToCreate);
    }
  }

  async addLines(objLinesIncomming: any) {
    console.log('Basketball Lines arrLines', objLinesIncomming.arrLines[1]);
    const { arrLines } = objLinesIncomming;
    for await (const i of arrLines) {
      // console.log('=== i.gameId', i.gameId);
      const temp = Object.assign(i);
      temp.game_id = i.gameId;
      delete temp.gameId;
      const res = await this.findLines(i);
    }
    console.log('Все линии БАСКЕТБОЛА обработаны!', Date());
    return 'Basketball Lines Ok';
  }

  // === Для отладки
  async addOneLine(objLinesIncomming: LinesDto) {
    console.log('Basketball One Lines objLinesIncomming', objLinesIncomming);
    const res = await this.findLines(objLinesIncomming);
    return 'Basketball One Lines Ok';
  }
}
