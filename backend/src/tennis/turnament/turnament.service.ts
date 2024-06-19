import { Injectable } from '@nestjs/common';
import { CreateTurnamentDto } from './dto/create-turnament.dto';
import { UpdateTurnamentDto } from './dto/update-turnament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Turnament } from './entities/turnament.entity';
import { Repository } from 'typeorm';
import { Surface } from '../surface/entities/surface.entity';
import { SurfaceService } from '../surface/surface.service';

@Injectable()
export class TurnamentService {
  constructor(
    @InjectRepository(Turnament)
    private turnamentRepository: Repository<Turnament>,
    private readonly sufaceService: SurfaceService,
  ) {}

  async create(createTurnamentDto: CreateTurnamentDto) {
    // console.log("createTurnamentDto", createTurnamentDto);
    // get surface
    const surface = await this.sufaceService.findName(createTurnamentDto.surface);
    console.log("SURFACE", surface);
    
    const tempObj = {
      timestamp: new Date(),
      name: createTurnamentDto.name,
      surface,
    }
    return await this.turnamentRepository.save(tempObj);
  }

  async findAll() {
    return `This action returns all turnament`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} turnament`;
  }

  // update(id: number, updateTurnamentDto: UpdateTurnamentDto) {
  //   return `This action updates a #${id} turnament`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} turnament`;
  // }
}
