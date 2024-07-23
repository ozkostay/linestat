import { Body, Injectable } from '@nestjs/common';
import { BodyTurnament } from './dto/bodyTurnament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Like, Repository } from 'typeorm';
import { Turnaments } from './entities/turnaments.entity';
import { CreateTurnament } from './dto/createTurnament.dto';

const mapSurface = new Map();
mapSurface.set('null', 0);
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
      surface: mapSurface.get(body.surface),
    };
    const newTurnament = this.turnamentsRepository.create(templateTurnament);
    return this.turnamentsRepository.save(newTurnament);
  }

  async findTurnament(body: BodyTurnament): Promise<any> {
    const [turnName, turnSurf, sport] = body.name.split('&&&');

    let sportId: number;
    switch (sport) {
      case 'tennis':
        sportId = 1;
        break;
      default:
        sportId = 0;
        break;
    }

    const response = await this.turnamentsRepository.findOneBy({
      name_ru: turnName,
    });
    if (response) {
      return response;
    } else {
      return this.createTurnament({
        sport: sportId,
        name: turnName,
        surface: turnSurf,
      });
    }
  }

  async getTurnament(body: BodyTurnament): Promise<any> {
    console.log('SERVICE', body);
    const turnament = this.findTurnament(body);
    return turnament;
  }
}
