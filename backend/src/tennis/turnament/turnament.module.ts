import { Module } from '@nestjs/common';
import { TurnamentService } from './turnament.service';
import { TurnamentController } from './turnament.controller';
import { Turnament } from './entities/turnament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurfaceModule } from '../surface/surface.module';

@Module({
  imports: [TypeOrmModule.forFeature([Turnament])],
  controllers: [TurnamentController],
  providers: [TurnamentService],
})
export class TurnamentModule {}
