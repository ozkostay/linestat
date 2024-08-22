import { Module } from '@nestjs/common';
import { FootballService } from './football.service';
import { FootballController } from './football.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Football } from './entities/football.entity';
import { LinesService } from './lines.service';
import { TransformDate } from './transformDate';
import { ResultService } from './results.service';

@Module({
  
  imports: [TypeOrmModule.forFeature([Football]), HttpModule],
  controllers: [FootballController],
  providers: [FootballService, LinesService, TransformDate, ResultService],
})
export class FootballModule {}
