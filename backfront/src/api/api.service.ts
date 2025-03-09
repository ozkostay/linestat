import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { GamesDto } from './dto/games.dto';
import { Games2FrontDto } from './dto/games2front.dto';
import { switchScan } from 'rxjs';

@Injectable()
export class ApiService {
  findAll() {
    return `This action returns all API LINESTAT BACKFRONT`;
  }

  async addLinesToGames(games: any[]) {
    const sport: number = games[0].sport;
    let dbName: string;
    // console.log('SPORT', games[0].sport);
    switch (sport) {
      case 1:
        dbName = 'tennis';
        break;
      case 2:
        dbName = 'football';
        break;
      case 3:
        dbName = 'hockey';
        break;
      case 4:
        dbName = 'basketball';
        break;
      default:
        dbName = 'error';
        break;
    }
    const url = `${process.env.HOST_SERVICE_BACKEND}:${process.env.SERVICE_PORT_BACKEND}/${dbName}/getfirstline?game=`;
    const newGames = [];
    // games.forEach(async (item: any) => {
    for await (const item of games) {
      try {
        const res = await fetch(url + item.id);
        const data = await res.json();
        console.log('DATAA', data);
        item.line = await data;
      } catch (error) {
        console.log('ERROR', error);
      }
    }
    return games;
  }

  async getLines(params: any) {
    // const temp = [];
    // temp.push(params);
    // return temp;
    // console.log('777', params);
    const url = `${process.env.HOST_SERVICE_GAMES}:${process.env.SERVICE_PORT_GAMES}/front/lines?turnamentId=${params.turnamentId}&playerId=${params.playerId}`;
    // console.log('url', url);
    try {
      const res = await fetch(url);
      const data = await res.json();
      const games = await this.fillGames(data);
      const gamesWithLines = await this.addLinesToGames(games);
      return gamesWithLines;
    } catch (error) {
      console.log('Ошибка в запросе getLines()', error);
    }
  }

  async getPlayerByTurnament(turnamentId: string): Promise<any> {
    const url = `${process.env.HOST_SERVICE_GAMES}:${process.env.SERVICE_PORT_GAMES}/front/players?turnamentId=${turnamentId}`;
    console.log('url', url);
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log('Ошибка в запросе getPlayerByTurnament()', error);
    }
    // return { ccc: url };
  }

  async writeOneResult(oneResult: { id: any; result: any; date: any }) {
    // console.log("API SERVISE writeOneResult()", oneResult);
    let url = `${process.env.HOST_SERVICE_GAMES}:${process.env.SERVICE_PORT_GAMES}/oneresult`;
    // console.log('url', url);
    // let firstParam = true;
    try {
      // for (const [key, value] of Object.entries(params)) {
      //   url += (firstParam ? '?' : '&') + `${key}=${value}`;
      //   firstParam = false;
      // }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Указываем тип данных в теле запроса
        },
        body: JSON.stringify(oneResult),
      });
      // const game: GamesDto = await res.json();
      const game: any = await res.json();

      return game;
    } catch (error) {
      throw new Error(error);
    }
    // return { status: 200, message: "API SERVISE writeOneResult()" }
  }

  async getPlayer(id: number) {
    const url = `${process.env.HOST_SERVICE_PLAYERS}:${process.env.SERVICE_PORT_PLAYERS}/longname/${id}`;
    try {
      const res = await fetch(url);
      const data: { longName: string } = await res.json();
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
    const url = `${process.env.HOST_SERVICE_TURNAMENTS}:${process.env.SERVICE_PORT_TURNAMENTS}/oneturnament/${id}`;
    try {
      const res = await fetch(url);
      const data: { name_ru: string } = await res.json();
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
        line: null,
      });
    }

    return games;
  }

  async getGames(params: any) {
    let url = `${process.env.HOST_SERVICE_GAMES}:${process.env.SERVICE_PORT_GAMES}/front/empty`;
    console.log('url', url);
    let firstParam = true;
    try {
      for (const [key, value] of Object.entries(params)) {
        url += (firstParam ? '?' : '&') + `${key}=${value}`;
        firstParam = false;
      }

      const res = await fetch(url);
      const data: GamesDto[] = await res.json();
      const games = await this.fillGames(data);

      return games;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTurnamentsBySportId(id: number) {
    const url = `${process.env.HOST_SERVICE_TURNAMENTS}:${process.env.SERVICE_PORT_TURNAMENTS}/turnaments?sportId=${id}`;
    try {
      const res = await fetch(url);
      const turnaments = await res.json();
      return turnaments;
    } catch (error) {
      throw new Error(error);
    }
  }
}
