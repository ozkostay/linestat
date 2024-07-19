import { Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from './entities/games.entity';
import { Repository } from 'typeorm';
import { BodyGames } from './dto/bodyGames.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Games)
    private playersRepository: Repository<Games>,
  ) {}

  getHello(): string {
    return 'Hello World! GAMES';
  }

  async getGames(body: BodyGames): Promise<any> {
    console.log('servise BODY', body);
    return 'Games getPlayers(1)';
  }
}
