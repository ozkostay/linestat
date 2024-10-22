import { Injectable } from '@nestjs/common';
import { AppService } from './app.service';

@Injectable()
export class LogService {
  // constructor(private readonly httpService: HttpService) {}
  constructor(
    private readonly appService: AppService
  ) {}

  
  logBody( body: any ): any {
    // console.log('httpQuerry params=', params);
    // let myobservable$: Observable<AxiosResponse<any, any>>;
    // if (params.method === 'get') {
    //   myobservable$ = this.httpService.get(params.url);
    // } else if (params.method === 'post') {
    //   myobservable$ = this.httpService.post(params.url, params.options);
    // }
    // const response: AxiosResponse<any, any> =
    //   await lastValueFrom(myobservable$);
    this.appService.logToFile(JSON.stringify(body));
    return `Лог записан ${JSON.stringify(body)}`;
  }
}