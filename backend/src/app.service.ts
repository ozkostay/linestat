import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as fs from 'fs';
import { lastValueFrom, Observable } from 'rxjs';
import { OneGame } from './dto/oneGame';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

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

  async getGame(gameId) {
    let myobservable$: Observable<AxiosResponse<any, any>>;
    let url: string;
    let response: AxiosResponse<any, any>;

    // Получаем game по id из get
    url = `${process.env.HOST_SERVICE_GAMES}:${process.env.SERVICE_PORT_GAMES}/onegame/${gameId}`;
    console.log('game url=', url);
    myobservable$ = this.httpService.get(url);
    response = await lastValueFrom(myobservable$);
    const oneGame: OneGame = await response.data;

    const turnamentId = oneGame.turnament;
    const player1Id = oneGame.player1;
    const player2Id = oneGame.player2;

    // Получаем Турнир по id
    // url = `${process.env.HOST_SERVICE_GAMES}:${process.env.SERVICE_PORT_GAMES}/onegame/${gameId}`;
    // console.log('game url=', url);
    // myobservable$ = this.httpService.get(url);
    // response = await lastValueFrom(myobservable$);
    // const turnament: OneGame = await response.data;

    return oneGame;
  }
}
