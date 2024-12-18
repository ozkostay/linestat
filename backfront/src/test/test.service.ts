import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { GamesDto } from './dto/games.dto';

@Injectable()
export class TestService {
  create(createTestDto: CreateTestDto) {
    return 'This action adds a new test';
  }

  findAll() {
    return `This action returns all TEST LINESTAT BACKFRONT`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} test`;
  // }

  // update(id: number, updateTestDto: UpdateTestDto) {
  //   return `This action updates a #${id} test`;
  // }

  // remove(id: number) {  //   return `This action removes a #${id} test`;
  // }
  async getPlayer(id: number, num: number) {
    // console.log('playyer', id, num);
    const url = `http://localhost:13903/longname/${id}`;
    //console.log('data', url);
    try {
      const res = await fetch(url, );
      const data: any = await res.json();
      console.log('data longname', data);
      const player = {
        id: id,
        name: data.longname,
      };
      return player;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTurnament(id: number) {
    const turnament = {
      id: id,
      name: 'ТурнирТест',
    };
    return turnament;
  }

  async getGames() {
    try {
      const url = 'http://localhost:13904/front/empty?sport=2&offset=0&limit=5';
      const res = await fetch(url);
      const data: GamesDto[] = await res.json();
      // console.log(data);
      const games: any[] = [];
      const aaa = async () => {
        data.forEach(async (item: GamesDto) => {
          // console.log(item);
          games.push({
            id: item.id,
            sport: item.sport,
            player1: await this.getPlayer(item.player1, 1),
            player2: await this.getPlayer(item.player2, 2),
          });
        });
      }
      

      console.log(999, games);

      // id: data.id};
      // games.player1 = data.id;

      return games;
    } catch (error) {
      throw new Error(error);
    }
  }
}
