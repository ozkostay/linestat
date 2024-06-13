import { Module } from '@nestjs/common';
import { TennisService } from './tennis.service';
import { TennisController } from './tennis.controller';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule],
  controllers: [TennisController],
  providers: [TennisService],
})
export class TennisModule {}
