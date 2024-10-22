import { Injectable } from '@nestjs/common';
import { BodyGames } from './dto/bodyGames.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from './entities/games.entity';
import { arrLinesDto } from './dto/arrLines.dto';
import { setPriority } from 'os';
import { gamesDto } from './dto/game.dto';
import { resolve } from 'path';
import { error } from 'console';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Games)
    private gamesRepository: Repository<Games>,
  ) {}

  getHello(): string {
    return 'Hello World! GAMES';
  }

  logToFile(content: string) {
    let textrow = `${Date()} ${content}\n`;
    fs.writeFile(`games.log`, textrow, { flag: 'a' }, (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });
  }

  async createGames(body: gamesDto): Promise<gamesDto> {
    console.log('createGames', body.player1, '-', body.player2);
    // body.timestamp = new Date();
    // body.result = '';
    const newGame = this.gamesRepository.create(body);
    
    this.logToFile(`Создана игра ${JSON.stringify(newGame)}`);
    
    return await this.gamesRepository.save(newGame);
  }

  async findGames(body: arrLinesDto): Promise<gamesDto> {
    console.log('findGames', body.name1Id, '-', body.name2Id);
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
    const sport = arrLines[0].sportId;
    this.logToFile(`Старт обработки GAMES sport=${sport}`);

    console.log('GAMES SERVICE', body);

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

    const data = await addGameId();
    const objResponse = { arrLines: data };

    this.logToFile(`Конец обработки GAMES sport=${sport}`);
    this.logToFile(`=====`);

    return objResponse;
  }

  async getOneGame(gameId: number): Promise<any> {
    const objToFind: { id: number } = {
      id: Number(gameId),
    };
    const response = await this.gamesRepository.findOneBy(objToFind);
    if (response) {
      return response;
    } else {
      throw new Error('Нет такого ID в games');
    }
    // return `Game id=${gameId}`;
  }

  async getManyGame(playerId): Promise<any> {
    const objToFind = {
      // where: [{ player1: playerId }, { player2: playerId }],
      where: [{ player1: playerId }, { player2: playerId }]
    };
    console.log('objToFind', objToFind);
    const response = await this.gamesRepository.find(objToFind);
    // const response = await this.gamesRepository.find( );
    if (response) {
      return response;
    } else {
      throw new Error('Нет такого ID в games');
    }

    //   userRepository.find({
    //     where: [
    //         { firstName: "Timber", lastName: "Saw" },
    //         { firstName: "Stan", lastName: "Lee" },
    //     ],
    // })
    // return { playerId };
  }
}
