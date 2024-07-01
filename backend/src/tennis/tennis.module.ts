import { Module } from '@nestjs/common';
import { TennisService } from './tennis.service';
import { TennisController } from './tennis.controller';
import { DbModule } from './db/db.module';
import { TurnamentModule } from './turnament/turnament.module';
import { SurfaceModule } from './surface/surface.module';
import { TurnamentService } from './turnament/turnament.service';
import { SurfaceService } from './surface/surface.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turnament } from './turnament/entities/turnament.entity';
import { Surface } from './surface/entities/surface.entity';

@Module({
  imports: [DbModule, TurnamentModule, SurfaceModule,TypeOrmModule.forFeature([Turnament, Surface])],
  controllers: [TennisController],
  providers: [TennisService, TurnamentService, SurfaceService],
})
export class TennisModule {}
