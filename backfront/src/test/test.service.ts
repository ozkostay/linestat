import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { GamesDto } from './dto/games.dto';
import { Games2FrontDto } from './dto/games2front.dto';

@Injectable()
export class TestService {
  create(createTestDto: CreateTestDto) {
    return 'This action adds a new test';
  }

  findAll() {
    return `This action returns all TEST LINESTAT BACKFRONT`;
  }

  async getPlayer(id: number) {
    const url = `http://localhost:13903/longname/${id}`;
    try {
      const res = await fetch(url);
      const data: {longName: string} = await res.json();
      const player = {
        id: id,
        name: data.longName ? data.longName : `Игрок не известен ${id}`,
      };

      return player;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTurnament(id: number) {
    const url = `http://localhost:13902/oneturnament/${id}`;
    try {
      const res = await fetch(url);
      const data: {name_ru: string} = await res.json();
      const turnament = {
        id: id,
        name: data.name_ru ? data.name_ru : `Турнир не известен ${id}`,
      };
      return turnament;
    } catch (error) {
      throw new Error(error);
    }
  }

  async fillGames(data: GamesDto[]) {
    const games: Games2FrontDto[] = [];

    for await (const item of data) {
      // console.log(444, item);
      games.push({
        id: item.id,
        timestamp: item.timestamp,
        sport: item.sport,
        turnament: await this.getTurnament(item.turnament),
        player1: await this.getPlayer(item.player1),
        player2: await this.getPlayer(item.player2),
        result: item.result,
        date: item.date,
      });
    }

    return games;
  }

  async getGames(params) {
    let url = 'http://localhost:13904/front/empty';
    let firstParam = true;
    try {
      for (const [key, value] of Object.entries(params)) {
        url += (firstParam ? '?' : '&') + `${key}=${value}`;
        firstParam = false;
      }
      console.log(777, url);
    
      const res = await fetch(url);
      const data: GamesDto[] = await res.json();
      const games = await this.fillGames(data);

      return games;
    } catch (error) {
      throw new Error(error);
    }
  }
}
