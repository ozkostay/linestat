import { Module } from '@nestjs/common';
import { TennisService } from './tennis.service';
import { TennisController } from './tennis.controller';
import { DbModule } from './db/db.module';
import { TurnamentModule } from './turnament/turnament.module';
import { SurfaceModule } from './surface/surface.module';

@Module({
  imports: [DbModule, TurnamentModule, SurfaceModule],
  controllers: [TennisController],
  providers: [TennisService],
})
export class TennisModule {}
