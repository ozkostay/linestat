import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as fs from 'fs';
import { lastValueFrom, Observable } from 'rxjs';
import { OneGame } from './dto/oneGame';
import { OneTurnament } from './dto/oneTurnament';
import { OnePlayer } from './dto/onePlayer';
import { QuerryParamsDto } from './dto/querryParams.dto';
import { GetTurnamentAndPlayers } from './dto/getTurnamentAndPlayers.dto';
import { AxiosService } from './axios.service';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly axiosService: AxiosService,
  ) {}

  getHello(): string {
    this.logToFile('Тест лога');
    console.log('Hello World! I am LINESTAT!!!\n');
    return 'Hello World! I am LINESTAT!!!';
  }

  logToFile(content: string) {
    let textrow = `${Date()} ${content}\n`;
    fs.writeFile(`backend.log`, textrow, { flag: 'a' }, (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });
  }

  getSportName(sportId: number) {
    let sportName: string;

    switch (sportId) {
      case 1:
        sportName = 'Теннис';
        break;
      case 2:
        sportName = 'Футбол';
        break;
      case 3:
        sportName = 'Хоккей';
        break;
      case 4:
        sportName = 'Баскетбол';
        break;
      default:
        sportName = 'Теннис';
    }

    return sportName;
  }

  async getTurnamentAndPlayers(getObj: GetTurnamentAndPlayers) {
    let querryParam: QuerryParamsDto;

    // Получаем Турнир по id
    querryParam = {
      url: `${process.env.HOST_SERVICE_TURNAMENTS}:${process.env.SERVICE_PORT_TURNAMENTS}/oneturnament/${getObj.turnamentId}`,
      method: 'get',
      options: null,
    };
    // const oneTurnament: OneGame = await this.httpQuerry(querryParam);
    const oneTurnament: OneGame = await this.axiosService.httpQuerry(querryParam);

    // Получаем Player1 по id
    querryParam = {
      url: `${process.env.HOST_SERVICE_PLAYERS}:${process.env.SERVICE_PORT_PLAYERS}/oneplayer/${getObj.player1Id}`,
      method: 'get',
      options: null,
    };
    const onePlayer1: OnePlayer = await this.axiosService.httpQuerry(querryParam);

    // Получаем Player2 по id
    querryParam = {
      url: `${process.env.HOST_SERVICE_PLAYERS}:${process.env.SERVICE_PORT_PLAYERS}/oneplayer/${getObj.player2Id}`,
      method: 'get',
      options: null,
    };
    const onePlayer2: OnePlayer = await this.axiosService.httpQuerry(querryParam);

    return { oneTurnament, onePlayer1, onePlayer2 };
  }

  async getGame(gameId: string) {
    let querryParam: QuerryParamsDto;

    // Получаем game по id из get
    querryParam = {
      url: `${process.env.HOST_SERVICE_GAMES}:${process.env.SERVICE_PORT_GAMES}/onegame/${gameId}`,
      method: 'get',
      options: null,
    };
    const oneGame: OneGame = await this.axiosService.httpQuerry(querryParam);

    const getObj: GetTurnamentAndPlayers = {
      turnamentId: oneGame.turnament,
      player1Id: oneGame.player1,
      player2Id: oneGame.player2,
    };

    const arrTurnamentAndPlayers = await this.getTurnamentAndPlayers(getObj);

    const responseObj = {
      id: oneGame.id,
      timestamp: oneGame.timestamp,
      sport: this.getSportName(oneGame.sport),
      turnament: arrTurnamentAndPlayers.oneTurnament,
      player1: arrTurnamentAndPlayers.onePlayer1,
      player2: arrTurnamentAndPlayers.onePlayer2,
      surface: 3,
      result: oneGame.result,
      date: oneGame.date,
    };

    return responseObj;
  }
}
