import { Injectable } from '@nestjs/common';
import { BodyGames } from './dto/bodyGames.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from './entities/games.entity';
import { arrLinesDto } from './dto/arrLines.dto';
import { setPriority } from 'os';
import { gamesDto } from './dto/game.dto';
import { resolve } from 'path';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Games)
    private gamesRepository: Repository<Games>,
  ) {}

  getHello(): string {
    return 'Hello World! GAMES';
  }

  async createGames(body: gamesDto): Promise<gamesDto> {
    console.log('createGames', body.player1, '-', body.player2);
    // body.timestamp = new Date();
    // body.result = '';
    const newGame = this.gamesRepository.create(body);
    return await this.gamesRepository.save(newGame);
  }

  async findGames(body: arrLinesDto): Promise<gamesDto> {
    console.log('findGames', body.name1Id, '-',body.name2Id);
    const objToFind: gamesDto = {
      sport: body.sportId,
      turnament: body.turnId,
      player1: body.name1Id,
      player2: body.name2Id,
      surface: body.surfaceId,
    };
    const response = await this.gamesRepository.findOneBy(objToFind);
    if (response) {
      return response;
    } else {
      objToFind.timestamp = new Date(body.timestamp);
      return await this.createGames(objToFind);
    }
  }

  async getGames(body: BodyGames): Promise<any> {
    const { arrLines } = body;
    console.log('GAMES SERVICE');

    // Первый рабочий вариант =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // const addGameId = async () => {
    //   const arrLinesReturn = [];
    //   for (const i of arrLines) {
    //     const temp = Object.assign(i);
    //     const res = await this.findGames(i);
    //     temp.gameId = res.id;
    //     arrLinesReturn.push(temp);
    //   }
    //   return arrLinesReturn;
    // };

    const addGameId = async () => {
      const arrLinesReturn = [];
      for await (const i of arrLines) {
        const temp = Object.assign(i);
        const res = await this.findGames(i);
        temp.gameId = res.id;
        arrLinesReturn.push(temp);
      }
      return arrLinesReturn;
    };

    const data =  await addGameId();
    const objResponse = { arrLines: data}
    return objResponse;
  }
}
