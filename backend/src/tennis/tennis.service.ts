import { Injectable } from '@nestjs/common';
import { CreateTennisDto } from './dto/create-tennis.dto';
import { UpdateTennisDto } from './dto/update-tennis.dto';

@Injectable()
export class TennisService {
  create(createTennisDto: CreateTennisDto) {
    return 'This action adds a new tennis';
  }

  findAll() {
    return `This action returns all tennis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tennis`;
  }

  update(id: number, updateTennisDto: UpdateTennisDto) {
    return `This action updates a #${id} tennis`;
  }

  remove(id: number) {
    return `This action removes a #${id} tennis`;
  }
}
