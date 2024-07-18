import { Injectable } from '@nestjs/common';
import { BodyTurnament } from './dto/bodyTurnament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turnaments } from './entities/turnaments.entity';

const mapSurface = new Map();
mapSurface.set('ТРАВА', 0);
mapSurface.set('ГРУНТ', 1);
mapSurface.set('ХАРД', 2);
mapSurface.set('КОВЕР', 3);

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Turnaments)
    private turnamentsRepository: Repository<Turnaments>,
  ) {}
  getHello(): string {
    return 'Hello World! TURNAMENTS';
  }

  async createTurnament(body: BodyTurnament): Promise<any> {
    const newTurnament: { name_ru: string; name_en: string; surface: number } =
      {
        name_ru: body.name,
        name_en: 'sssddd',
        surface: mapSurface.get(body.surface),
      };
    const newPhoto = this.turnamentsRepository.create({
      ...newTurnament,
    });
    return this.turnamentsRepository.save(newPhoto);
  }

  async findTurnament(body: BodyTurnament): Promise<any> {
    const [turnName, turnSurf] = body.name.split('&&&');

    const response = await this.turnamentsRepository.findOneBy({
      name_ru: turnName,
    });
    if (response) {
      return response;
    } else {
      return this.createTurnament({
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
