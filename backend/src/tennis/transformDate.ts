import { Injectable } from '@nestjs/common';

@Injectable()
export class TransformDate {
  
  transformDate (strData: string): string {
    const months = new Map();
    months.set('янв.', '01');
    months.set('фев.', '02');
    months.set('мар.', '03');
    months.set('апр.', '04');
    months.set('май.', '05');
    months.set('июн.', '06');
    months.set('июл.', '07');
    months.set('авг.', '08');
    months.set('сен.', '09');
    months.set('окт.', '10');
    months.set('ноя.', '11');
    months.set('дек.', '12');

    if (strData.length < 7) {
      return null;
    }

    const arrDate = strData.split(" ");
    const dayTemp = arrDate[2] ? arrDate[0] : new Date().getDate();
    const monthTemp = arrDate[2]
      ? months.get(arrDate[1])
      : new Date().getMonth();
    const yearTemp = new Date().getFullYear();
    const timeTemp = arrDate[2] ? arrDate[2] : arrDate[0];
    const tempDateString = `${yearTemp}.${monthTemp}.${dayTemp} ${timeTemp}`;
    console.log('111', strData,'222', tempDateString);
    return tempDateString;
  }
}
