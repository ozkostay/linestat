import { Module } from '@nestjs/common';
import { TurnamentService } from './turnament.service';
import { TurnamentController } from './turnament.controller';

@Module({
  controllers: [TurnamentController],
  providers: [TurnamentService],
})
export class TurnamentModule {}
