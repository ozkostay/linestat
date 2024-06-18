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
    const isExists = await this.findOne(createSurfaceDto.name);
    if (!isExists) {
      return await this.surfaceRepository.save(createSurfaceDto);
    }
    return 'there is such a type of surface';
  }

  async findAll() {
    return await this.surfaceRepository.find();
  }

  async findOne(name: string) {
    const test = await this.surfaceRepository.findOne({
      where: {
        name,
      },
    });
    console.log('TEST', test);
    return test;
  }

  async update(id: number, updateSurfaceDto: UpdateSurfaceDto) {
    return `This action updates a #${id} surface`;
  }

  async remove(id: number) {
    return `This action removes a #${id} surface`;
  }
}
