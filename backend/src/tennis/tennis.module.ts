import { Module } from '@nestjs/common';
import { TennisService } from './tennis.service';
import { TennisController } from './tennis.controller';

@Module({
  controllers: [TennisController],
  providers: [TennisService],
})
export class TennisModule {}
