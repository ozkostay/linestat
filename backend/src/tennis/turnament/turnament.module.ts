import { Module } from '@nestjs/common';
import { TurnamentService } from './turnament.service';
import { TurnamentController } from './turnament.controller';
import { Turnament } from './entities/turnament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurfaceModule } from '../surface/surface.module';
import { Surface } from '../surface/entities/surface.entity';
import { SurfaceService } from '../surface/surface.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turnament, Surface])],
  controllers: [TurnamentController],
  providers: [TurnamentService, SurfaceService],
})
export class TurnamentModule {}
