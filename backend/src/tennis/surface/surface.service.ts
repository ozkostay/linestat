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
  
  create(createSurfaceDto: CreateSurfaceDto) {
    return this.surfaceRepository.save(createSurfaceDto);
    //return 'This action adds a new surface';
  }

  findAll() {
    return `This action returns all surface`;
  }

  findOne(id: number) {
    return `This action returns a #${id} surface`;
  }

  update(id: number, updateSurfaceDto: UpdateSurfaceDto) {
    return `This action updates a #${id} surface`;
  }

  remove(id: number) {
    return `This action removes a #${id} surface`;
  }
}
