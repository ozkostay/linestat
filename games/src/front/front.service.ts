import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from 'src/entities/games.entity';
import { IsNull, Repository } from 'typeorm';
import { emptyDto } from './dto/empty.dto';
import { gamesDto } from 'src/dto/game.dto';
import { gamesDto2 } from './dto/game.dto';

@Injectable()
export class FrontService {
  constructor(
    @InjectRepository(Games)
    private gamesRepository: Repository<Games>,
  ) {}

  async getGamesByTurnamentPlayer(params: any) {
    let objToFind: any;
    if(params.playerId == 'null') {
      objToFind = {
        where: {
          turnament: Number(params.turnamentId),
        }  
      }
    } else {
      objToFind = {
        where: [
          { turnament: Number(params.turnamentId), player1: Number(params.playerId) },
          { turnament: Number(params.turnamentId), player2: Number(params.playerId) },
        ],
      }
    }
    const games: gamesDto2[] = await this.gamesRepository.find(objToFind);
    return games
  }

  async getPlayerByTurnament(turnamentId: number): Promise<any> {
    try {
      const objToFind: any = {
        where: {
          turnament: turnamentId,
        },
      };
      const games: gamesDto2[] = await this.gamesRepository.find(objToFind);
      const playersSet = new Set();
      
      games.forEach((item) => {
        playersSet.add(item.player1);
        playersSet.add(item.player2);
      })
      console.log('===', playersSet);
      
      const url = `${process.env.HOST_SERVICE_PLAYERS}:${process.env.SERVICE_PORT_PLAYERS}/oneplayer/`;
      const players = [];
      for await (const playerId of playersSet) {
        // Обработка асинхронного значения
        try {
          console.log('playerId', playerId);
          const response = await fetch(url + playerId);
          const player = await response.json();
          players.push(player);

        } catch (error) {
          console.log('Не найден игрок с ID=', playerId);
        }
      }

      return players;
    } catch {

      throw new Error('Ошибка запроса GAMES, front.service, getPlayerByTurnament()s');
    }
    // return { bbb: turnamentId };
  }

  async getEmpty(body: emptyDto) {
    console.log('getEmpty', body);
    const objToFind: any = {
      order: {
        id: 'ASC',
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
    // console.log('555', objToFind);

    try {
      let games = await this.gamesRepository.find(objToFind);

      return games;
    } catch {
      throw new Error('Ошибка запроса GAMES, front.service, getEmpty');
    }
  }
}
