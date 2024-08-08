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

  async getallEmptyResults() {
    try {
      const response = await this.gamesRepository.find({
        where: {
          result: '',
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async addResults(arrResults: any[]): Promise<any> {
    console.log('GAME RESULT-SERVISE OK', arrResults.length, arrResults[0]);

    const allEmptyResults = await this.getallEmptyResults();
    console.log('allEmptyResults', allEmptyResults);
    return { status: 200, message: 'get Results in servise GAME!!!' };
  }
}
