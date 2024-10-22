import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Players } from './entities/players.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BodyPlayers } from './dto/bodyplayers.dto';
import { CreatePlayers } from './dto/createplayers.dto';
import { IncomingMessage } from 'http';
import { IncomingPlayers } from './dto/incoming.players.dto';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Players)
    private playresRepository: Repository<Players>,
  ) {}

  getHello(): string {
    return 'Hello World! PLAYERS';
  }

  logToFile(content: string) {
    let textrow = `${Date()} ${content}\n`;
    fs.writeFile(`players.log`, textrow, { flag: 'a' }, (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });
  }

  async getLongNameById(id: number): Promise<any> {
    try {
      const response = await this.playresRepository.findOneBy({ id });
      return { longName: response.name_ru };
    } catch (error) {
      return { status: 400, message: `ID ${id} не найден` };
    }
  }

  async getShortNameById(id: number): Promise<any> {
    try {
      const response = await this.playresRepository.findOneBy({ id });
      const arrfullName = response.name_ru.split(', ');
      const shortName = `${arrfullName[1].slice(0, 1)}.${arrfullName[0]}`;
      return { shortName: shortName };
    } catch (error) {
      return { status: 400, message: `ID ${id} не найден` };
    }
  }

  async createPlayers(body: CreatePlayers): Promise<any> {
    console.log('SERVICE createPlayers', body);
    const tempPlayer: object = {};
    Object.assign(tempPlayer, body, { name_en: ' ' });
    console.log('SERVICE createPlayers tempPlayer', tempPlayer);
    
    const newPlayer = this.playresRepository.create(tempPlayer);
    
    this.logToFile(`Создан игрок ${JSON.stringify(newPlayer)}`);

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
      name_ru: body.name_ru,
      sport: sportId,
    };
    const response = await this.playresRepository.findOneBy(objToFind);
    if (response) {
      return response;
    } else {
      return this.createPlayers(objToFind);
    }
  }

  async getPlayers(body: BodyPlayers): Promise<any> {
    // console.log('SERVICE', body);

    const name_ru = body.name;
    const sport = body.sport;

    const findPlayer: any = { name_ru: name_ru, sport: sport };
    const player = this.findPlayers(findPlayer);

    return player;
  }

  async getOnePlayer(playerId): Promise<any> {
    const objToFind: { id: number } = {
      id: playerId,
    };
    const response = await this.playresRepository.findOneBy(objToFind);
    if (response) {
      return response;
    } else {
      return { status: 500, message: `Игрок с id=${playerId} не найден` };
    }
  }
}
