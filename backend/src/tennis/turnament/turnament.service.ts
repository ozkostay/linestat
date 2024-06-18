import { Injectable } from '@nestjs/common';
import { CreateTurnamentDto } from './dto/create-turnament.dto';
import { UpdateTurnamentDto } from './dto/update-turnament.dto';

@Injectable()
export class TurnamentService {
  create(createTurnamentDto: CreateTurnamentDto) {
    return 'This action adds a new turnament';
  }

  findAll() {
    return `This action returns all turnament`;
  }

  findOne(id: number) {
    return `This action returns a #${id} turnament`;
  }

  update(id: number, updateTurnamentDto: UpdateTurnamentDto) {
    return `This action updates a #${id} turnament`;
  }

  remove(id: number) {
    return `This action removes a #${id} turnament`;
  }
}
