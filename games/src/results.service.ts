import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from './entities/games.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Games)
    private gamesRepository: Repository<Games>,
  ) {}

  async addResults(body: any): Promise<any> {
    console.log('GAME RESULT-SERVISE OK'), body.length, body[1];
    return { status: 200, message: 'get Results in servise GAME!!!' };
  }
}
