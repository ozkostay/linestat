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

  async addResults(arrResults: any): Promise<any> {
    console.log('GAME RESULT-SERVISE OK', arrResults.length, arrResults[0]);
    return { status: 200, message: 'get Results in servise GAME!!!' };
  }
}
