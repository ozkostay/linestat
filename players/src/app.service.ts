import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Players } from './entities/players.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BodyPlayers } from './dto/bodyplayers.dto';
import { CreatePlayers } from './dto/createplayers.dto';
import { IncomingMessage } from 'http';
import { IncomingPlayers } from './dto/incoming.players.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Players)
    private playresRepository: Repository<Players>,
  ) {}

  getHello(): string {
    return 'Hello World! PLAYERS';
  }

  async getShortNameById(id: number): Promise<any> {
    try {
      const response = await this.playresRepository.findOneBy({id});
      const arrfullName = response.name_ru.split(', ');
      const shortName = `${arrfullName[1].slice(0,1)}.${arrfullName[0]}`;
      return { shortName: shortName};
    } catch (error) {
      return { status: 400, message: `ID ${id} не найден`};
    }
  }

  async createPlayers(body: CreatePlayers): Promise<any> {
    console.log('SERVICE createPlayers', body);
    const tempPlayer: object = {};
    Object.assign(tempPlayer, body, { name_en: ' ' });
    console.log('SERVICE createPlayers tempPlayer', tempPlayer);
    const newPlayer = this.playresRepository.create(tempPlayer);
    return this.playresRepository.save(newPlayer);
  }

  async findPlayers(body: IncomingPlayers): Promise<any> {
    console.log('SERVICE findPlayers', body);

    let sportId: number;
    switch (body.sport) {
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

    const objToFind: CreatePlayers = {
      name_ru: body.name_ru , sport: sportId,
    }
    const response = await this.playresRepository.findOneBy(objToFind);
    if (response) {
      return response;
    } else {
      return this.createPlayers(objToFind);
    }
  }

  async getPlayers(body: BodyPlayers): Promise<any> {
    console.log('SERVICE', body);
    const arrBody = body.name.split('&&&');
    
    const findPlayer: any = { name_ru: arrBody[0], sport: arrBody[1]};
        const player = this.findPlayers(findPlayer);
        
    return player;
  }
}
