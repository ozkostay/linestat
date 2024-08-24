import { Injectable } from '@nestjs/common';
import { QueryResult, Repository } from 'typeorm';
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

  async getallEmptyResults(sport) {
    try {
      const response = await this.gamesRepository.find({
        where: {
          date: null,
          sport: sport,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async queryToPlayers(id: string, sport: number) {
    let url: string;
    if (sport === 1) {
      url = `${process.env.HOST_SERVICE_PLAYERS}:${process.env.SERVICE_PORT_PLAYERS}/shortname/${id}`;
    } else {
      url = `${process.env.HOST_SERVICE_PLAYERS}:${process.env.SERVICE_PORT_PLAYERS}/longname/${id}`;
    }

    //onsole.log('url: ', url)

    const arrFromGames$: Observable<AxiosResponse<any, any>> =
      this.httpService.get(url);
    const response: AxiosResponse<any, any> =
      await lastValueFrom(arrFromGames$); // Observable => Promis
    return await response.data;
  }

  async modyEmptyResults(inArr: gamesDto[], sport: number): Promise<any> {
    // const outArr = [];
    const mapGames = new Map();
    for await (const game of inArr) {
      // Получаем shortName первого и второго игрока
      const playerName1 = await this.queryToPlayers(String(game.player1), sport);
      const playerName2 = await this.queryToPlayers(String(game.player2), sport);
      let mergeNames:string;
      if (sport === 1) {
        mergeNames = `${playerName1.shortName}-${playerName2.shortName}`;
      } else {
        mergeNames = `${playerName1.longName}-${playerName2.longName}`;
      }

      mapGames.set(mergeNames, game.id);
      console.log('ID', game.id, ' names ', mergeNames);
    }

    for (const [key, value] of mapGames) {
      //console.log('555-MAP() ', key, value);
    }

    return mapGames;
  }

  async updateGames(inObj: { id: number; result: string; date: Date }) {
    const { id, result, date } = inObj;
    try {
      const game = await this.gamesRepository.findOneBy({ id });
      // Обновляем свойства
      game.result = result;

      console.log('=== date', date);
      const newDate = new Date(date);
      console.log('=== newDate', newDate);
      game.date = newDate;
      // Сохраняем изменения
      const modyGame = await this.gamesRepository.save(game);
      console.log('Обновили Game ', game);
      return modyGame;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async addResults(arrResults: any[]): Promise<any> {
    // Получаем Map('Player1-Player2', idGame)

    const sport = arrResults[0].sport;
    const allEmptyResults = await this.getallEmptyResults(sport);
    console.log('allEmptyResults', allEmptyResults[0]);

    const mapNamesId = await this.modyEmptyResults(allEmptyResults, sport);
    // for (const [key, value] of mapNamesId.entries()) {
    //   console.log('===MAP===', key, value);
    // }
    // console.log('555rs', arrGamesarrGames);

    // console.log('game serv addRes', arrResults);
    // Записываем результат
    for await (const result of arrResults) {
      //console.log('DATE !!!', result.result , '---', `${result.player1}-${result.player2}`);
      const mergeNames: string = `${result.player1}-${result.player2}`;
      const game_id = mapNamesId.get(mergeNames);

      // console.log('DAME !!!', mergeNames, '---', idGame,'DATA' ,result.data);
      if (game_id) {
        const outObj = {
          id: game_id,
          result: result.result,
          date: result.date,
        };
        const res = await this.updateGames(outObj);
      }
    }

    console.log('Обработка результатов закончена.!!!');
    // console.log('GAME RESULT-SERVISE OK', arrResults.length, arrResults[0]);

    return { status: 200, message: 'get Results in servise GAME!!!' };
  }
}
