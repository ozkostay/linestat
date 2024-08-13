import { Module } from '@nestjs/common';
import { FootballService } from './football.service';
import { FootballController } from './football.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { DbModuleFootball } from './db/db.module';
import { Football } from './entities/football.entity';
import { LinesService } from './lines.service';

@Module({
  
  imports: [DbModuleFootball, TypeOrmModule.forFeature([Football]), HttpModule],
  controllers: [FootballController],
  providers: [FootballService, LinesService],
})
export class FootballModule {}
