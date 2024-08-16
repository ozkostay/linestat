import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from './entities/games.entity';
import { gamesDto } from './dto/game.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Games)
    private gamesRepository: Repository<Games>,
    private readonly httpService: HttpService,
  ) {}

  async getallEmptyResults() {
    try {
      const response = await this.gamesRepository.find({
        where: {
          date: null,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async queryToPlayers(id: string) {
    
    const url = `${process.env.HOST_SERVICE_PLAYERS}:${process.env.SERVICE_PORT_PLAYERS}/${id}`;
    console.log('url: ', url)

    const arrFromGames$: Observable<AxiosResponse<any, any>> =
      this.httpService.get(url);
    const response: AxiosResponse<any, any> =
      await lastValueFrom(arrFromGames$); // Observable => Promis
    return await response.data;
  }

  async modyEmptyResults(inArr: gamesDto[]): Promise<any> {
    // const outArr = [];
    const mapGames = new Map();
    for await (const game of inArr) {
      // Получаем shortName первого и второго игрока
      const shotName1 = await this.queryToPlayers(String(game.player1));
      const shotName2 = await this.queryToPlayers(String(game.player2));
      const mergeNames: string = `${shotName1.shortName}-${shotName2.shortName}`;
      mapGames.set(mergeNames, game.id);
      console.log('ID', game.id, ' name ', mergeNames);
    }

    for (const [key, value] of mapGames) {
      console.log('555', key, value);
    }

    return mapGames;
  }

  async updateGames(inObj: { id: number; result: string; date: Date }) {
    const { id, result, date } = inObj;
    // try {
    //   const game = await this.gamesRepository.findOneBy({ id });
    //   // Обновляем свойства
    //   game.result = result;
    //   console.log('=== date', date);
    //   const newDate = new Date(date.toISOString().slice(0, 19).replace('T', ' '));
    //   console.log('=== newDate', newDate);
    //   game.date = newDate;
    //   // Сохраняем изменения
    //   const modyGame = await this.gamesRepository.save(game);
    //   return modyGame;
    // } catch (error) {
    //   console.error(error);
    //   return;
    // }
  }

  async addResults(arrResults: any[]): Promise<any> {
    // Получаем Map('Player1-Player2', idGame)
    const allEmptyResults = await this.getallEmptyResults();
    const mapNamesId = await this.modyEmptyResults(allEmptyResults);

    // Записываем результат
    for await (const result of arrResults) {
      const mergeNames: string = `${result.player1}-${result.player2}`;
      const idGame = mapNamesId.get(mergeNames);
      console.log('!!!', mergeNames, '---', idGame);
      if (idGame) {
        const outObj = {
          id: idGame,
          result: result.result,
          date: result.date,
        };
        const res = await this.updateGames(outObj);
      }
    }

    console.log('GAME RESULT-SERVISE OK', arrResults.length, arrResults[0]);

    return { status: 200, message: 'get Results in servise GAME!!!' };
  }
}
