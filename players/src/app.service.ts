import { Injectable } from '@nestjs/common';
import { BodyPlayers } from './dto/bodyPlayers.dto';
import { Repository } from 'typeorm';
import { Players } from './entities/players.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Players)
    private playersRepository: Repository<Players>,
  ) {}

  getHello(): string {
    return 'Hello World! PLAYERS';
  }

  async createPlayers(body: BodyPlayers): Promise<any> {
    const newPlayer: { name_ru: string; name_en: string } = {
      name_ru: body.name,
      name_en: 'sssddd',
    };
    const newPhoto = this.playersRepository.create({
      ...newPlayer,
    });
    return this.playersRepository.save(newPhoto);
  }

  async findPlayers(body: BodyPlayers): Promise<any> {
    const response = await this.playersRepository.findOneBy({
      name_ru: body.name,
    });
    if (response) {
      return response;
    } else {
      return this.createPlayers({
        name: body.name,
      });
    }
  }

  async getPlayers(body: BodyPlayers): Promise<any> {
    console.log('SERVICE', body);
    const turnament = this.findPlayers(body);
    return turnament;
  }
}
