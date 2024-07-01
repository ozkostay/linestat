import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSurfaceDto } from './dto/create-surface.dto';
import { UpdateSurfaceDto } from './dto/update-surface.dto';
import { Surface } from './entities/surface.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class SurfaceService {
  constructor(
    @InjectRepository(Surface)
    private surfaceRepository: Repository<Surface>,
  ) {}

  // async create(createSurfaceDto: CreateSurfaceDto) {
  //   return await this.surfaceRepository.save(createSurfaceDto);
  // }

  async findAll() {
    // return await this.surfaceRepository.find();
    return 'All surface';
  }

  async findName(name: string): Promise<any> {
    // return surface if exists
      console.log('111');
      const isExists = await this.surfaceRepository.findOne({
        where: {
          name: name.toLowerCase(),
        },
      });
      if (!isExists) {
        return { id: 0, name: 'no surface'}
      }
      return isExists
    }
    
  async update(id: number, updateSurfaceDto: UpdateSurfaceDto) {
    return `This action updates a #${id} surface`;
  }

  async remove(id: number) {
    return `This action removes a #${id} surface`;
  }
}
