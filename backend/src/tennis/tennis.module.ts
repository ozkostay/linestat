import { Module } from '@nestjs/common';
import { TennisService } from './tennis.service';
import { TennisController } from './tennis.controller';
import { DbModule } from './db/db.module';
import { TurnamentModule } from './turnament/turnament.module';
import { TurnamentModule } from './turnament/turnament.module';

@Module({
  imports: [DbModule, TurnamentModule],
  controllers: [TennisController],
  providers: [TennisService],
})
export class TennisModule {}
