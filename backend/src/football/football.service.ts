import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Football } from './entities/football.entity';
import { lastValueFrom, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FootballService {
  constructor(
    @InjectRepository(Football)
    private footballRepository: Repository<Football>,
    private readonly httpService: HttpService,
  ) {}

  findAll() {
    return `This action returns all football`;
  }

  async getTurnament(nameTurnament: any) {
    // Берем из микросервиса Турниров объект турнира и присваиваем в value
    console.log('nameTurnament', nameTurnament);
    let myobservable$: Observable<AxiosResponse<any, any>>;
    for (let key of nameTurnament.keys()) {
      myobservable$ = this.httpService.post(
        `${process.env.HOST_SERVICE_TURNAMENTS}:${process.env.SERVICE_PORT_TURNAMENTS}`,
        {
          name: key,
        },
      );
      const response: AxiosResponse<any, any> =
        await lastValueFrom(myobservable$);
      const data: object = await response.data;
      nameTurnament.set(key, data);
    }

    return nameTurnament;
  }

  async getPlayers(namePlayers: any) {
    // Берем из микросервиса Турниров объект турнира и присваиваем в value
    console.log('namePlayer', namePlayers);
    let myobservable$: Observable<AxiosResponse<any, any>>;
    for (let key of namePlayers.keys()) {
      myobservable$ = this.httpService.post(
        `${process.env.HOST_SERVICE_PLAYERS}:${process.env.SERVICE_PORT_PLAYERS}`,
        {
          name: key,
        },
      );
      const response: AxiosResponse<any, any> =
        await lastValueFrom(myobservable$); // Observable => Promis
      const data: object = await response.data;
      namePlayers.set(key, data);
    }

    return namePlayers;
  }

  async receivFromPars(arrLines: any[]) {
    const sport = 'football';
    // Делаем уникальные турниры
    const mapTurnamentName: any = new Map();
    arrLines.forEach((i) => {
      mapTurnamentName.set(`${i.turnament}&&&nosurface&&&${sport}`, null);
    });
    const mapTurns = await this.getTurnament(mapTurnamentName); // Получаем Map() mapTurns с ID из сервиса Turnaments

    // Делаем уникальныx Игроков
    const mapPlayersName: any = new Map();
    arrLines.forEach((i) => {
      mapPlayersName.set(`${i.name1}&&&${sport}`, null);
      mapPlayersName.set(`${i.name2}&&&${sport}`, null);
    });
    const mapPlayers = await this.getPlayers(mapPlayersName); // Получаем Map() mapPlayers с ID из сервиса Players
    for (const [key, value] of mapPlayers) {
      console.log('===', key, value);
    }
    return { message: 'temp return' };
   

    arrLines.forEach((i) => {
      i.turnId = mapTurns.get(`${i.turnament}&&&${i.surface}&&&${sport}`).id; //Заполняем id турнира
      i.sportId = mapTurns.get(
        `${i.turnament}&&&${i.surface}&&&${sport}`,
      ).sport; //Заполняем id турнира
      i.surfaceId = mapTurns.get(
        `${i.turnament}&&&${i.surface}&&&${sport}`,
      ).surface; //Заполняем id покрытия
      i.name1Id = mapPlayers.get(i.name1).id; //Заполняем id Игрока1
      i.name2Id = mapPlayers.get(i.name2).id; //Заполняем id Игрока2
    });

    // Работаем с сервисом GAMES
    // : Observable<AxiosResponse<any, any>>;
    const makeGames = async () => {
      const arrFromGames$ = this.httpService.post(
        `${process.env.HOST_SERVICE_GAMES}:${process.env.SERVICE_PORT_GAMES}`,
        {
          arrLines: arrLines,
        },
      );
      const response: AxiosResponse<any, any> =
        await lastValueFrom(arrFromGames$); // Observable => Promis
      const data: object = await response.data;
      // console.log('DATA333', data);
      return data;
    };

    const dataFromGames = await makeGames();

    // Получаем ID игроков
    console.log('!!!W dataFromGames)= ', Array.isArray(dataFromGames));

    // objResponse = { arrLines: dataFromGames}; НЕ НАДО

    // const resLines = this.linesService.addLines(dataFromGames);
    return { status: 200 };
  }
}
