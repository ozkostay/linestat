import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Football } from './entities/football.entity';

@Injectable()
export class FootballService {
  constructor(
    @InjectRepository(Football)
    private footballRepository: Repository<Football>,
  ) {}

  create(createFootballDto: any) {
    return 'This action adds a new football';
  }

  findAll() {
    return `This action returns all football`;
  }

  findOne(id: number) {
    return `This action returns a #${id} football`;
  }

  update(id: number, updateFootballDto: any) {
    return `This action updates a #${id} football`;
  }

  remove(id: number) {
    return `This action removes a #${id} football`;
  }
}
