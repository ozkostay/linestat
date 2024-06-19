import { Injectable } from '@nestjs/common';
import { CreateSurfaceDto } from './dto/create-surface.dto';
import { UpdateSurfaceDto } from './dto/update-surface.dto';
import { Surface } from './entities/surface.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SurfaceService {
  constructor(
    @InjectRepository(Surface)
    private surfaceRepository: Repository<Surface>,
  ) {}

  async create(createSurfaceDto: CreateSurfaceDto) {
    return await this.surfaceRepository.save(createSurfaceDto);
  }

  async findAll() {
    return await this.surfaceRepository.find();
  }

  async findName(name: string) {
    // return surface if exists
    const isExists = await this.surfaceRepository.findOne({
      where: {
        name,
      },
    });
    console.log("=== isEx = ", isExists);
    if (!isExists) {
      // creating it manually !!!

      // create surface if not exists and return
      // const newTurnament = await this.create({ name });
      // return newTurnament;
    }

    return isExists;
  }

  async update(id: number, updateSurfaceDto: UpdateSurfaceDto) {
    return `This action updates a #${id} surface`;
  }

  async remove(id: number) {
    return `This action removes a #${id} surface`;
  }
}
