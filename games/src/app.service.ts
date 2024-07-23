import { Injectable } from '@nestjs/common';
import { BodyGames } from './dto/bodyGames.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from './entities/games.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Games)
    private gamesRepository: Repository<Games>,
  ) {}

  getHello(): string {
    return 'Hello World! PLAYERS';
  }

  async createGames(body: BodyGames): Promise<any> {
    const newGame = this.gamesRepository.create(body);
    newGame.timestamp = new Date();
    return this.gamesRepository.save(newGame);
  }

  async findGames(body: BodyGames): Promise<any> {
    const response = await this.gamesRepository.findOneBy(body);
    if (response) {
      return response;
    } else {
      return this.createGames(body);
    }
  }

  async getGames(body: BodyGames): Promise<any> {
    console.log('SERVICE', body);
    const turnament = this.findGames(body);
    return turnament;
  }
}
