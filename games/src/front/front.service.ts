import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from 'src/entities/games.entity';
import { IsNull, Repository } from 'typeorm';
import { emptyDto } from './dto/empty.dto';

@Injectable()
export class FrontService {
  constructor(
    @InjectRepository(Games)
    private gamesRepository: Repository<Games>,
  ) {}

  async getEmpty(body: emptyDto) {
    console.log('getEmpty', body);
    const objToFind: any = {
      order: {
        id: "ASC",
      },
      where: {
        result: IsNull(),
        sport: Number(body.sport),
      },
    };
    
    if (body.offset) {
      objToFind.skip = body.offset; 
    }
    if (body.limit) {
      objToFind.take = body.limit; 
    }
    console.log('555', objToFind);

    try {
      let games = await this.gamesRepository.find(objToFind);

      return games;
    } catch {
      throw new Error('Ошибка запроса GAMES, front.service, getEmpty');
    }
  }
}
