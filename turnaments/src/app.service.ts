import { Injectable } from '@nestjs/common';
import { BodyTurnament } from './dto/bodyTurnament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turnaments } from './entities/turnaments.entity';

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
        surface: 0,
      };
    const newPhoto = this.turnamentsRepository.create({
      ...newTurnament
    });
    return this.turnamentsRepository.save(newPhoto);
  }

  async findTurnament(body: BodyTurnament): Promise<any> {
    // const { name } = body;
    const response = await this.turnamentsRepository.findOneBy({
      name_ru: body.name,
    });
    if (response) {
      return response;
    } else {
      // return Promise.resolve({ fig: 'nya'})
      return this.createTurnament(body);
    }
  }

  async getTurnament(body: BodyTurnament): Promise<any> {
    console.log('SERVICE', body);
    const turnament = this.findTurnament(body);
    return turnament;
  }
}
