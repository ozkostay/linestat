import { Injectable } from '@nestjs/common';
import { CreateTennisDto } from './dto/create-tennis.dto';
import { UpdateTennisDto } from './dto/update-tennis.dto';
import { BodyFromParsing } from './dto/bodyFromParsing.dto';
import { TurnamentService } from './turnament/turnament.service';

@Injectable()
export class TennisService {
  constructor(
    private readonly turnamentService: TurnamentService,
  ) {}

  async receivFromPars(arrLines: BodyFromParsing[]) {
    arrLines.forEach((item) => {
      //   // Find turnament, if not then create
      //this.turnamentService.
      console.log(item.turnament, item.surface, item.name1, item.name2);
    });

    return { status: 200 };
  }
  //   create(createTennisDto: CreateTennisDto) {
  //     return 'This action adds a new tennis';
  //   }

  //   findAll() {
  //     return `This action returns all tennis`;
  //   }

  //   findOne(id: number) {
  //     return `This action returns a #${id} tennis`;
  //   }

  //   update(id: number, updateTennisDto: UpdateTennisDto) {
  //     return `This action updates a #${id} tennis`;
  //   }

  //   remove(id: number) {
  //     return `This action removes a #${id} tennis`;
  //   }
}
