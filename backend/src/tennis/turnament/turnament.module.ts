import { Module } from '@nestjs/common';
import { TurnamentService } from './turnament.service';
import { TurnamentController } from './turnament.controller';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule],
  controllers: [TurnamentController],
  providers: [TurnamentService],
})
export class TurnamentModule {}
