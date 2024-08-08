import { Module } from '@nestjs/common';
import { TennisService } from './tennis.service';
import { TennisController } from './tennis.controller';
import { DbModule } from './db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { LinesService } from './lines.service';
import { Tennis } from './entities/tennis.entity';
import { TransformDate } from './transformDate';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Tennis]), HttpModule],
  controllers: [TennisController],
  providers: [TennisService, LinesService, TransformDate],
})
export class TennisModule {}
