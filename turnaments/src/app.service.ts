import { Body, Injectable } from '@nestjs/common';
import { BodyTurnament } from './dto/bodyTurnament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Like, Repository } from 'typeorm';
import { Turnaments } from './entities/turnaments.entity';
import { CreateTurnament } from './dto/createTurnament.dto';
import * as fs from 'fs';

const mapSurface = new Map();
mapSurface.set('ТРАВА', 1);
mapSurface.set('ГРУНТ', 2);
mapSurface.set('ХАРД', 3);
mapSurface.set('КОВЕР', 4);

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Turnaments)
    private turnamentsRepository: Repository<Turnaments>,
  ) {}

  logToFile(content: string) {
    let textrow = `${Date()} ${content}\n`;
    fs.writeFile(`turnament.log`, textrow, { flag: 'a' }, (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });
  }

  getHello(): string {
    return 'Hello World! TURNAMENTS';
  }

  async getWithArrParam(): Promise<any> {
    // Просто пример!!! в работе не
    const arrParam = [0, 9];
    const response = await this.turnamentsRepository.findBy({
      surface: 2,
      id: LessThan(715),
    });
    return response;
  }

  async createTurnament(body: BodyTurnament): Promise<any> {
    const templateTurnament: CreateTurnament = {
      sport: body.sport,
      name_ru: body.name,
      name_en: ' ',
      surface: mapSurface.get(body.surface) || 0,
    };
    const newTurnament = this.turnamentsRepository.create(templateTurnament);
    this.logToFile('createTurnament, OK')
    return this.turnamentsRepository.save(newTurnament);
  }

  async findTurnament(body: BodyTurnament): Promise<any> {
    const [turnName, turnSurf, sport] = body.name.split('&&&');

    let sportId: number;
    switch (sport) {
      case 'tennis':
        sportId = 1;
        break;
      case 'football':
        sportId = 2;
        break;
      case 'hockey':
        sportId = 3;
        break;
      case 'basketball':
        sportId = 4;
        break;
      default:
        sportId = 0;
        break;
    }

    console.log('ttt', 222);

    const response = await this.turnamentsRepository.findOneBy({
      sport: sportId,
      name_ru: turnName,
    });

    if (response) {
      console.log('ttt', 333);
      this.logToFile('findTurnament, OK')
      return response;
    } else {
      console.log('ttt', 3434, turnSurf);
      return this.createTurnament({
        sport: sportId,
        name: turnName,
        surface: turnSurf,
      });
    }
  }

  async getTurnament(body: BodyTurnament): Promise<any> {
    console.log('SERVICE', body);
    this.logToFile('getTurnament, 102')
    const turnament = this.findTurnament(body);
    return turnament;
  }












  async getOneTurnament(turnamentId: number): Promise<any> {
    const response = await this.turnamentsRepository.findOneBy({
      id: turnamentId,
    });

    if (response) {
      console.log('ttt', 333);
      return response;
    } else {
      // console.log('ttt', 3434, turnSurf);
      return {
        status: 500,
        message: `Турнир Id=${turnamentId} не найден`,
      };
    }
  }
}
