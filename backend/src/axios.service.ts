import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as fs from 'fs';
import { lastValueFrom, Observable } from 'rxjs';
import { QuerryParamsDto } from './dto/querryParams.dto';

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}

  async httpQuerry(params: QuerryParamsDto): Promise<any> {
    console.log('httpQuerry params=', params);
    let myobservable$: Observable<AxiosResponse<any, any>>;
    if (params.method === 'get') {
      myobservable$ = this.httpService.get(params.url);
    } else if (params.method === 'post') {
      myobservable$ = this.httpService.post(params.url, params.options);
    }
    const response: AxiosResponse<any, any> =
      await lastValueFrom(myobservable$);

    return response.data;
  }
}
