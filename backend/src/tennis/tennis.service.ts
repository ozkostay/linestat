import { Injectable } from '@nestjs/common';
import { BodyFromParsing } from './dto/bodyFromParsing.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TennisService {
  constructor(private readonly httpService: HttpService) {
    // private readonly turnamentService: TurnamentService,
  }

  async getTurnament(nameTurnament: any) {
    // Берем из микросервиса Турниров объект турнира и присваиваем в value
    console.log('nameTurnament', nameTurnament);
    let myobservable$: Observable<AxiosResponse<any, any>>;
    for (let key of nameTurnament.keys()) {
      console.log('555 ', key);
      myobservable$ = this.httpService.post('http://localhost:13002', {
        name: key,
      });
      const response: AxiosResponse<any, any> =
        await lastValueFrom(myobservable$);
      const data: object = await response.data;
      nameTurnament.set(key, data);
    }

    return nameTurnament;
  }

  async getPlayers(namePlayers: any) {
    // Берем из микросервиса Турниров объект турнира и присваиваем в value
    console.log('nameTurnament', namePlayers);
    let myobservable$: Observable<AxiosResponse<any, any>>;
    for (let key of namePlayers.keys()) {
      console.log('555 ', key);
      myobservable$ = this.httpService.post('http://localhost:13003', {
        name: key,
      });
      const response: AxiosResponse<any, any> =
        await lastValueFrom(myobservable$);
      const data: object = await response.data;
      namePlayers.set(key, data);
    }

    return namePlayers;
  }

  async receivFromPars(arrLines: BodyFromParsing[]) {
    // Делаем уникальные турниры
    const mapTurnamentName: any = new Map(
      arrLines.map((i) => [`${i.turnament}&&&${i.surface}`, null]), // По &&& потом разделяем
    );
    // Делаем уникальныx Игроков
    const mapPlayersName: any = new Map();
    arrLines.forEach((i) => {
      mapPlayersName.set(i.name1, null);
      mapPlayersName.set(i.name2, null);
    });

    const mapTurns = await this.getTurnament(mapTurnamentName); // Получаем Map() mapTurns с ID
    const mapPlayers = await this.getPlayers(mapPlayersName); // Получаем Map() mapPlayers с ID

    arrLines.forEach((i) => {
      i.turnId = mapTurns.get(`${i.turnament}&&&${i.surface}`).id; //Заполняем id турнира
      i.name1Id = mapPlayers.get(i.name1).id; //Заполняем id Игрока1
      i.name2Id = mapPlayers.get(i.name2).id; //Заполняем id Игрока2
    });

    // Получаем ID игроков
    console.log('!!!W', arrLines);

    return { status: 200 };
  }
}
