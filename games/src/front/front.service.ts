import { Injectable } from '@nestjs/common';
import { CreateFrontDto } from './dto/create-front.dto';
import { UpdateFrontDto } from './dto/update-front.dto';
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
      where: [{ result: IsNull() }],
    };
    
    try {
      let games = await this.gamesRepository.find(objToFind);
      if (body?.sport) {
        return games.find((i) => i.sport = Number(body.sport));
      } else {
        return games;
      }
      
    } catch {
      throw new Error("Ошибка запроса GAMES, front.service, getEmpty")
    }

    
  }
}
