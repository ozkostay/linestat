import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as fs from 'fs';
import { lastValueFrom, Observable } from 'rxjs';
import { OneGame } from './dto/oneGame';
import { OneTurnament } from './dto/oneTurnament';
import { OnePlayer } from './dto/onePlayer';

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
    url = `${process.env.HOST_SERVICE_TURNAMENTS}:${process.env.SERVICE_PORT_TURNAMENTS}/oneturnament/${turnamentId}`;
    console.log('turnament url=', url);
    myobservable$ = this.httpService.get(url);
    response = await lastValueFrom(myobservable$);
    const oneTurnament: OneTurnament = await response.data;

    // Получаем Player1 по id
    url = `${process.env.HOST_SERVICE_PLAYERS}:${process.env.SERVICE_PORT_PLAYERS}/oneplayer/${player1Id}`;
    console.log('player1 url=', url);
    myobservable$ = this.httpService.get(url);
    response = await lastValueFrom(myobservable$);
    const onePlayer1: OnePlayer = await response.data;

    // Получаем Player2 по id
    url = `${process.env.HOST_SERVICE_PLAYERS}:${process.env.SERVICE_PORT_PLAYERS}/oneplayer/${player2Id}`;
    console.log('player2 url=', url);
    myobservable$ = this.httpService.get(url);
    response = await lastValueFrom(myobservable$);
    const onePlayer2: OnePlayer = await response.data;

    return [oneGame, oneTurnament, onePlayer1, onePlayer2];
  }
}
