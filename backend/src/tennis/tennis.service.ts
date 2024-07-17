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
    let myobservable$: Observable<AxiosResponse<any, any>>;
    for (let turnament of nameTurnament.keys()) {
      myobservable$ = this.httpService.post('http://localhost:13002', {
        name: turnament,
      });
      const response: AxiosResponse<any, any> =
        await lastValueFrom(myobservable$);
      const data: object = await response.data;
      nameTurnament.set(turnament, data);
    }
    
    return nameTurnament;
  }

  async receivFromPars(arrLines: BodyFromParsing[]) {
    // Делаем уникальные турниры
    const mapTurnamentName: any = new Map(arrLines.map((i) => [i.turnament, null]));
    const mapTurns = await this.getTurnament(mapTurnamentName);
    arrLines.forEach((item) => {
      item.turnId = mapTurns.get(item.turnament).id; //Заполняем id турнира
    });

    console.log('!!!W', arrLines);

    return { status: 200 };
  }
  
  //   create(createTennisDto: CreateTennisDto) {
  //     return 'This action adds a new tennis';
  //   }

  //   findAll() {
  //     return `This action returns all tennis`;
  //   }

  //   findOne(id: number) {
  //     return `This action returns a #${id} tennis`;
  //   }

  //   update(id: number, updateTennisDto: UpdateTennisDto) {
  //     return `This action updates a #${id} tennis`;
  //   }

  //   remove(id: number) {
  //     return `This action removes a #${id} tennis`;
  //   }
}
